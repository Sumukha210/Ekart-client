import SubHeading from "@/elements/SubHeading";
import PriceDetails from "@/layout/cart/PriceDetails";
import ProductCart from "@/layout/cart/ProductCart";
import SectionContainer from "@/shared/modules/SectionContainer";
import { useEffect } from "react";

const Cart = () => {
  useEffect(() => {
    return () => {
      console.log("Cart unmounting");
    };
  }, []);

  return (
    <>
      <SectionContainer className="mt-10">
        <div className="lg:grid gap-6 xl:gap-12 lg:grid-cols-12">
          <div className="col-span-8">
            <SubHeading text="My Cart" className="mb-6 lg:mb-8" />
            <ProductCart />
          </div>

          <div className="col-span-4">
            <SubHeading text="Price Details" className="mb-6 lg:mb-8 mt-12 lg:mt-0" />
            <PriceDetails />
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default Cart;
