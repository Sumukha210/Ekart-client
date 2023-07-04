import Spinner from "@/elements/Spinner";
import AllFilterMenu from "@/layout/products/AllFilterMenu";
import FilterSortMenu from "@/layout/products/FilterSortMenu";
import { filterReducer, initialFilterState } from "@/layout/products/FiltersReducer";
import { IProduct } from "@/lib/types";
import ProductCard from "@/shared/modules/ProductCard";
import SectionContainer from "@/shared/modules/SectionContainer";
import { useEffect, useReducer, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";

const Products = () => {
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [state, dispatch] = useReducer(filterReducer, initialFilterState);
  const { isSideBarOpen } = state;

  const closeAllFilterMenu = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/products?limit=10&skip=${skip}`);
      const data = await response.json();

      if (data?.status === "success") {
        if (data?.result?.length) {
          setProducts((prevProducts) => [...prevProducts, ...data.result]);
          setSkip((prevSkip) => prevSkip + data.result.length);
        }
      }

      if (data?.result?.length === 0 || products.length + data.result.length >= data.total) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSideBarOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "initial";
      document.body.style.height = "initial";
    }
  }, [isSideBarOpen]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SectionContainer>
      <Overlay className={`fixed w-screen h-screen left-0 top-0 bg-black  z-40  ${isSideBarOpen ? "visible opacity-40" : "invisible opacity-0"}`}></Overlay>
      <AllFilterMenu dispatch={dispatch} closeAllFilterMenu={closeAllFilterMenu} state={state} />
      <FilterSortMenu />

      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={hasMore}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }>
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
          {products.length ? products.map((product: IProduct) => <ProductCard {...product} key={product._id} />) : "No Products"}
        </div>
      </InfiniteScroll>
    </SectionContainer>
  );
};

export default Products;

const Overlay = styled.div`
  transition: all 0.6s ease-in-out;
`;
