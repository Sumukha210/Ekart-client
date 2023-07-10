import ProductFilterMenu from "@/layout/productList/ProductFilterMenu";
import { default as ProductListHeader } from "@/layout/productList/ProductListHeader";
import Products from "@/layout/productList/Products";
import { RootState } from "@/redux/store";
import SectionContainer from "@/shared/modules/SectionContainer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ProductsPage = () => {
  const isSideBarOpen = useSelector((state: RootState) => state.productList.isSideBarOpen);

  useEffect(() => {
    if (isSideBarOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "initial";
      document.body.style.height = "initial";
    }
  }, [isSideBarOpen]);

  return (
    <SectionContainer className="mt-0">
      <Overlay className={`fixed w-screen h-screen left-0 top-0 bg-black  z-40  ${isSideBarOpen ? "visible opacity-40" : "invisible opacity-0"}`}></Overlay>
      <ProductFilterMenu />
      <ProductListHeader />
      <Products />
    </SectionContainer>
  );
};

export default ProductsPage;

const Overlay = styled.div`
  transition: all 0.6s ease-in-out;
`;
