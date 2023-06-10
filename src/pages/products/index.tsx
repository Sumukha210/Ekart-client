import Spinner from "@/elements/Spinner";
import AllFilterMenu from "@/layout/products/AllFilterMenu";
import { useFetchProducts } from "@/layout/products/useFetchProducts";
import ProductCard from "@/shared/modules/ProductCard";

import SectionContainer from "@/shared/modules/SectionContainer";
import { useEffect, useState } from "react";
import { BsFilter } from "react-icons/bs";
import styled from "styled-components";

interface ISortBy {
  label: string;
  value: string;
}

const sortBy: ISortBy[] = [
  { label: "Popularity", value: "popular" },
  { label: "Price -  Low to High", value: "priceLow" },
  { label: "Price -  High to Low", value: "priceHigh" },
  { label: "Newest First", value: "newest" },
];

const Products = () => {
  const [skip, setSkip] = useState(0);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { isError, isLoading, products, lastProductElementRef } = useFetchProducts(skip, setSkip);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<null | number>(null);

  useEffect(() => {
    if (isSideBarOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "initial";
      document.body.style.height = "initial";
    }
  }, [isSideBarOpen]);

  const handleSelectCategory = (category: string, isSelected: boolean) => {
    return () => {
      if (!isSelected) {
        setSelectedCategory((prev) => [...prev, category]);
      } else {
        const newCategories = [...selectedCategory].filter((categoryItem) => category != categoryItem);
        setSelectedCategory(newCategories);
      }
    };
  };

  const handleSelectBrand = (brand: string, isSelected: boolean) => {
    return () => {
      if (!isSelected) {
        setSelectedBrand((prev) => [...prev, brand]);
      } else {
        const newCategories = [...selectedBrand].filter((brandItem) => brand != brandItem);
        setSelectedBrand(newCategories);
      }
    };
  };

  const handleSelectedRating = (rating: number) => setSelectedRating(rating);

  const closeAllFilterMenu = () => setIsSideBarOpen(false);

  return (
    <SectionContainer>
      <div className="my-10">
        <div className="flex items-center justify-between gap-6 mb-4">
          <div onClick={() => setIsSideBarOpen(true)} className="cursor-pointer flex items-center bg-gray-200 px-5 py-2 rounded-full">
            <BsFilter className="h-5 w-5" />
            <h4 className="text-sm font-semibold">Filters</h4>
          </div>

          <div className="text-sm ">
            <label htmlFor="sortBy" className="font-semibold">
              Sort By |
            </label>
            <Select id="sortBy" className="py-2 bg-gray-200 ml-2  px-5 rounded-full">
              {sortBy.map(({ label, value }) => (
                <option value={value} key={value} className="my-2  inline-block">
                  {label}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <hr className="border-gray-300"></hr>
      </div>

      <Overlay className={`fixed w-screen h-screen left-0 top-0 bg-black  z-40  ${isSideBarOpen ? "visible opacity-40" : "invisible opacity-0"}`}></Overlay>
      <AllFilterMenu
        handleSelectBrand={handleSelectBrand}
        handleSelectCategory={handleSelectCategory}
        isSideBarOpen={isSideBarOpen}
        selectedBrand={selectedBrand}
        selectedCategory={selectedCategory}
        closeAllFilterMenu={closeAllFilterMenu}
        selectedRating={selectedRating}
        handleSelectedRating={handleSelectedRating}
      />

      <div className="grid grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
        {products.length
          ? products.map((product, index) => {
              if (products.length === index + 1) {
                return (
                  <div key={product._id} ref={lastProductElementRef}>
                    <ProductCard {...product} />
                  </div>
                );
              }

              return (
                <div key={product._id}>
                  <ProductCard {...product} />
                </div>
              );
            })
          : null}
      </div>
      {isLoading && <Spinner />}
      {isError && <h2 className="text-3xl">Failed to fetch products</h2>}
    </SectionContainer>
  );
};

export default Products;

const Overlay = styled.div`
  transition: all 0.6s ease-in-out;
`;

const Select = styled.select``;
