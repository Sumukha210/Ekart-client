import { useGetBrandsQuery, useGetCategoriesQuery } from "@/redux/api/productApi";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/modules/Accordion";
import { Dispatch } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Action, IFilterState } from "./FiltersReducer";
import Ratings from "./Ratings";
import { ButtonContainer, RangeSlider, SideBar } from "./style";

interface AllFilterMenuprops {
  closeAllFilterMenu: () => void;
  dispatch: Dispatch<Action>;
  state: IFilterState;
}

const AllFilterMenu: React.FC<AllFilterMenuprops> = ({ state, closeAllFilterMenu, dispatch }) => {
  const { data: brands, isLoading: isBrandsLoading } = useGetBrandsQuery(null);
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery(null);
  const { isSideBarOpen, selectedCategory, selectedBrand, price, selectedRating } = state;

  return (
    <>
      <SideBar className={`bg-gray-200 fixed top-0  ${isSideBarOpen ? "left-0" : "-left-96"} h-screen w-96 z-50 overflow-y-auto`}>
        <div className="m-4 relative">
          <div className="absolute right-0 top-0 flex items-center bg-gray-300 px-4 py-1 rounded-full cursor-pointer" onClick={closeAllFilterMenu}>
            <span className="text-sm font-semibold">Close</span>
            <AiOutlineClose className="h-4 w-4" />
          </div>

          <Accordion type="single" collapsible className="w-full pt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold transition hover:text-lime-500">Price</AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center">
                  <span className="font-medium">1</span>
                  <RangeSlider
                    type="range"
                    className="w-full bg-gray-300 mt-2 mx-2"
                    min={1}
                    max={5000}
                    value={price}
                    onChange={(e) => dispatch({ type: "SELECT_PRICE", price: Number(e.target.value) })}
                  />
                  <span className="font-medium">5000</span>
                </div>

                <h3 className="mt-4">
                  <span className="font-medium">Amount:- </span> <span className="text-base font-semibold">{price} Rs.</span>
                </h3>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2 -mt-2">
              <AccordionTrigger className="font-semibold transition hover:text-lime-500">
                <span>Categories {selectedCategory.length ? <span className="text-sm">( {selectedCategory.length} )</span> : null}</span>
              </AccordionTrigger>
              <AccordionContent className="pl-2">
                <ul className="font-medium capitalize space-y-3">
                  {!isCategoriesLoading && categories?.result
                    ? categories.result.map((category: string) => {
                        const isSelected = selectedCategory.indexOf(category) != -1;
                        return (
                          <li
                            onClick={() => dispatch({ type: "SELECT_CATEGORY", category, isSelected })}
                            className={`hover:text-dark hover:underline hover:font-semibold transition-all cursor-pointer flex items-center ${
                              isSelected ? "text-blue-500 font-semibold" : ""
                            }`}
                            key={category}>
                            {isSelected && <AiOutlineCheck />}
                            <span className="ml-1">{category}</span>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold transition hover:text-lime-500">
                <span>Brands {selectedBrand.length ? <span className="text-sm">( {selectedBrand.length} )</span> : null}</span>
              </AccordionTrigger>
              <AccordionContent className="pl-2">
                <ul className="font-medium capitalize space-y-3">
                  {!isBrandsLoading && brands?.result
                    ? brands.result.map((brand: string) => {
                        const isSelected = selectedBrand.indexOf(brand) != -1;
                        return (
                          <li
                            onClick={() => dispatch({ type: "SELECT_BRAND", brand, isSelected })}
                            className={`hover:text-dark hover:underline hover:font-semibold transition-all cursor-pointer flex items-center ${
                              isSelected ? "text-blue-500 font-semibold" : ""
                            }`}
                            key={brand}>
                            {isSelected && <AiOutlineCheck />}
                            <span className="ml-1">{brand}</span>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="font-semibold transition hover:text-lime-500">Customer Ratings</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Ratings rating={4} selectedRating={selectedRating} handleRating={() => dispatch({ type: "SELECT_RATING", rating: 4 })} />
                  <Ratings rating={3} selectedRating={selectedRating} handleRating={() => dispatch({ type: "SELECT_RATING", rating: 3 })} />
                  <Ratings rating={2} selectedRating={selectedRating} handleRating={() => dispatch({ type: "SELECT_RATING", rating: 2 })} />
                  <Ratings rating={1} selectedRating={selectedRating} handleRating={() => dispatch({ type: "SELECT_RATING", rating: 1 })} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <ButtonContainer className={`fixed ${isSideBarOpen ? "left-0 opacity-100" : "-left-96 opacity-0"} w-96 bottom-0`}>
          <button className=" bg-lime-400 w-full font-semibold py-3" onClick={() => dispatch({ type: "SET_URL_PARAMS" })}>
            View Results
          </button>
        </ButtonContainer>
      </SideBar>
    </>
  );
};

export default AllFilterMenu;
