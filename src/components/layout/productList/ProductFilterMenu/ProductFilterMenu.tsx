import { useGetBrandsQuery, useGetCategoriesQuery } from "@/redux/api/productApi";
import { clearMenuFilters, selectBrand, selectCategory, selectRating, togglePrice, toggleSidebar, viewResult } from "@/redux/slices/productListSlice";
import { RootState } from "@/redux/store";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/modules/Accordion";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import FilterList from "./FilterList";
import Ratings from "./Ratings";
import { ButtonContainer, RangeSlider, SideBar } from "./style";

interface ProductFilterMenuprops {}

const ProductFilterMenu: React.FC<ProductFilterMenuprops> = () => {
  const { data: brands, isLoading: isBrandsLoading } = useGetBrandsQuery(null);
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery(null);
  const { isSideBarOpen, price, selectedCategory, selectedBrand, selectedRating, appliedFilter } = useSelector((state: RootState) => state.productList);
  const dispatch = useDispatch();

  const CATEGORIES = (
    <FilterList
      isLoading={isCategoriesLoading}
      items={categories?.result}
      selectedItems={selectedCategory}
      onSelectItem={(category, isSelected) => dispatch(selectCategory({ category, isSelected }))}
    />
  );

  const BRANDS = (
    <FilterList
      isLoading={isBrandsLoading}
      items={brands?.result}
      selectedItems={selectedBrand}
      onSelectItem={(brand, isSelected) => dispatch(selectBrand({ brand, isSelected }))}
    />
  );

  return (
    <>
      <SideBar className={`bg-light fixed top-0  ${isSideBarOpen ? "left-0" : "-left-96"} h-screen w-96 z-50 overflow-y-auto`}>
        <div className="m-4 relative">
          <div className="flex items-center justify-between">
            <div
              className={`bg-gray-200 px-5 py-1 text-grey gap-1 rounded-full cursor-pointer flex items-center ${appliedFilter.length ? "visible" : "invisible"}`}
              onClick={() => dispatch(clearMenuFilters())}>
              <span className="text-sm font-semibold ">Clear all Filters</span>
              <AiOutlineClose className="h-4 w-4" />
            </div>

            <div className="bg-gray-200 px-5 py-1 text-grey gap-1 rounded-full cursor-pointer flex items-center" onClick={() => dispatch(toggleSidebar(false))}>
              <span className="text-sm font-medium">Close</span>
              <AiOutlineClose className="h-4 w-4" />
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full pt-8">
            <AccordionItem className="border-grey" value="item-1">
              <AccordionTrigger className="font-medium text-dark transition hover:text-primary">Price</AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center">
                  <span className="font-medium">1</span>
                  <RangeSlider
                    type="range"
                    className="w-full bg-gray-300 mt-2 mx-2"
                    min={1}
                    max={5000}
                    value={price}
                    onChange={(e) => dispatch(togglePrice({ value: Number(e.target.value) }))}
                  />
                  <span className="font-medium">5000</span>
                </div>

                <h3 className="mt-4">
                  <span className="font-medium">Amount:- </span> <span className="text-base font-semibold">{price} Rs.</span>
                </h3>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2 -mt-2" className="border-grey">
              <AccordionTrigger className="font-medium text-dark transition hover:text-primary">
                <span>Categories {selectedCategory.length ? <span className="text-sm">( {selectedCategory.length} )</span> : null}</span>
              </AccordionTrigger>
              <AccordionContent className="pl-2">
                <ul className="capitalize space-y-3">{CATEGORIES}</ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-grey">
              <AccordionTrigger className="font-medium text-dark transition hover:text-primary">
                <span>Brands {selectedBrand.length ? <span className="text-sm">( {selectedBrand.length} )</span> : null}</span>
              </AccordionTrigger>
              <AccordionContent className="pl-2">
                <ul className="capitalize space-y-3">{BRANDS}</ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-grey">
              <AccordionTrigger className="font-medium text-dark transition hover:text-primary">Customer Ratings</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Ratings rating={4} selectedRating={selectedRating} handleRating={() => dispatch(selectRating({ value: 4 }))} />
                  <Ratings rating={3} selectedRating={selectedRating} handleRating={() => dispatch(selectRating({ value: 3 }))} />
                  <Ratings rating={2} selectedRating={selectedRating} handleRating={() => dispatch(selectRating({ value: 2 }))} />
                  <Ratings rating={1} selectedRating={selectedRating} handleRating={() => dispatch(selectRating({ value: 1 }))} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <ButtonContainer className={`fixed ${isSideBarOpen ? "left-0 opacity-100" : "-left-96 opacity-0"} w-96 bottom-0`}>
          <button className=" bg-primary w-full font-medium uppercase tracking-wider py-4 text-white text-sm hover:opacity-60" onClick={() => dispatch(viewResult())}>
            View Results
          </button>
        </ButtonContainer>
      </SideBar>
    </>
  );
};

export default ProductFilterMenu;
