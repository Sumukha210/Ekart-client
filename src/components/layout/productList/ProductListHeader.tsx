import { clearMenuFilters, selectSortBy, toggleSidebar } from "@/redux/slices/productListSlice";
import { AiOutlineClose } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import { useDispatch } from "react-redux";
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

        <div className="mb-4">
          <div className="bg-gray-200 px-4 py-1 text-gray-600 gap-1 rounded-full cursor-pointer inline-block" onClick={() => dispatch(clearMenuFilters())}>
            <h5 className="flex items-center">
              <span className="text-sm font-semibold ">Clear all Filters</span>
              <AiOutlineClose className="h-4 w-4" />
            </h5>
          </div>
        </div>

        <hr className="border-gray-300"></hr>
      </div>
    </>
  );
};

export default ProductListHeader;