import { useGetBrandsQuery, useGetCategoriesQuery } from "@/redux/api/productApi";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/modules/Accordion";
import { Dispatch } from "react";
import { AiFillStar, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { Action, IFilterState } from "./FiltersReducer";

interface AllFilterMenuprops {
  closeAllFilterMenu: () => void;
  dispatch: Dispatch<Action>;
  state: IFilterState;
}

const Ratings: React.FC<{ rating: number; handleRating: () => void }> = ({ rating, handleRating }) => {
  return (
    <div className="flex items-center w-3/6 cursor-pointer" onClick={handleRating}>
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <AiFillStar key={index} className={`h-4 w-4 ${index + 1 <= rating ? "text-black" : "text-gray-400"}`} />
        ))}
      </div>

      <h6 className="font-semibold ml-3 text-gray-600">& up</h6>
    </div>
  );
};

const AllFilterMenu: React.FC<AllFilterMenuprops> = ({ state, closeAllFilterMenu, dispatch }) => {
  const { data: brands, isLoading: isBrandsLoading } = useGetBrandsQuery(null);
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery(null);
  const { isSideBarOpen, selectedCategory, selectedBrand, price } = state;

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
                  <Ratings rating={4} handleRating={() => dispatch({ type: "SELECT_RATING", rating: 4 })} />
                  <Ratings rating={3} handleRating={() => dispatch({ type: "SELECT_RATING", rating: 3 })} />
                  <Ratings rating={2} handleRating={() => dispatch({ type: "SELECT_RATING", rating: 2 })} />
                  <Ratings rating={1} handleRating={() => dispatch({ type: "SELECT_RATING", rating: 1 })} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SideBar>
    </>
  );
};

export default AllFilterMenu;

const SideBar = styled.div`
  transition: left 0.6s ease-in-out;
`;

const RangeSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  opacity: 0.7;
  height: 10px;
  border-radius: 5px;
  outline: none;
  transition: opacity 0.3s ease-in;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #111111;
    cursor: pointer;
    border-radius: 50%;
  }
`;
