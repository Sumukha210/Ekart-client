import ClearBtn from "@/elements/ClearBtn";
import { secondaryFont } from "@/lib/fonts";
import { clearMenuFilters, selectBrand, selectCategory, selectRating, selectSortBy, togglePrice, toggleSidebar } from "@/redux/slices/productListSlice";
import { RootState } from "@/redux/store";
import { BsFilter } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

interface ISortBy {
  label: string;
  value: string;
}

const sortBy: ISortBy[] = [
  { label: "Popularity", value: "popularity" },
  { label: "Price -  Low to High", value: "priceLowToHigh" },
  { label: "Price -  High to Low", value: "priceHighToLow" },
  { label: "Newest First", value: "newest" },
];

const Select = styled.select``;

interface ProductListHeaderprops {}

const ProductListHeader: React.FC<ProductListHeaderprops> = () => {
  const dispatch = useDispatch();
  const appliedFilters = useSelector((state: RootState) => state.productList.appliedFilter);

  return (
    <>
      <div className="my-10">
        <div className="flex items-center justify-between gap-6 mb-4">
          <div onClick={() => dispatch(toggleSidebar(true))} className="cursor-pointer flex items-center bg-gray-200 px-5 py-2 rounded-full">
            <BsFilter className="h-5 w-5" />
            <h4 className="text-sm font-semibold">Filters</h4>
          </div>

          <div className="text-sm ">
            <label htmlFor="sortBy" className="font-semibold hidden sm:inline-block">
              Sort By |
            </label>
            <Select id="sortBy" onChange={(e) => dispatch(selectSortBy(e.target.value))} className="py-2 bg-gray-200 ml-2  px-5 rounded-full font-medium">
              {sortBy.map(({ label, value }) => (
                <option value={value} key={value} className="my-2  inline-block">
                  {label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <hr className="border-gray-300"></hr>

        {appliedFilters.length ? (
          <div className="my-4">
            <h3 className={`${secondaryFont.className} text-lg font-semibold tracking-wider mb-4`}>Applied Filters:-</h3>

            <div className="space-x-4">
              {appliedFilters.map((filter) => (
                <ClearBtn
                  clickEvent={() => {
                    if (filter === "Brand") {
                      dispatch(selectBrand({ type: "clear" }));
                    } else if (filter === "Category") {
                      dispatch(selectCategory({ type: "clear" }));
                    } else if (filter === "Rating") {
                      dispatch(selectRating({ type: "clear" }));
                    } else if (filter === "Price") {
                      dispatch(togglePrice({ type: "clear" }));
                    }
                  }}
                  key={filter}
                  label={filter}
                />
              ))}

              <ClearBtn clickEvent={() => dispatch(clearMenuFilters())} label="Clear all Filters" />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ProductListHeader;
