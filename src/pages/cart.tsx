import PageHeading from "@/elements/PageHeading";
import CartItem from "@/layout/cart/CartItem";
import { calculateTotalPrice } from "@/lib/utils";
import { RootState } from "@/redux/store";
import SectionContainer from "@/shared/SectionContainer";
import { useEffect } from "react";
import { AiOutlinePercentage } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import { useSelector } from "react-redux";

const Cart = () => {
  const { products } = useSelector((state: RootState) => state.cart);

  const totalPrice = products.reduce((acc, current) => acc + current.price * current.numberOfItemsSelected, 0);
  const totalDiscount = products.reduce((acc, current) => acc + current.discountPercentage, 0);
  const finalPrice = calculateTotalPrice(totalPrice, totalDiscount);
  const saveAmount = Number(totalPrice - finalPrice).toFixed(0);

  useEffect(() => {
    return () => {
      console.log("Cart unmounting");
    };
  }, []);

  return (
    <SectionContainer>
      <div className="grid gap-6 lg:gap-12 grid-cols-12">
        <div className="col-span-8">
          <PageHeading text="My Cart" />

          {products.length ? (
            products.map((product) => <CartItem key={product.id} {...product} />)
          ) : (
            <h3 className="text-lg font-semibold text-gray-400 tracking-wider">No products are added in the cart</h3>
          )}
        </div>

        <div className="col-span-4">
          <PageHeading text="Price Details" />
          <div className="bg-white border border-borderColor rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 gap-x-6 gap-y-4 p-4">
              <div className="col-span-8 font-semibold">Total Amount</div>
              <div className="col-span-4 font-medium text-gray-600 tracking-wider flex items-center">
                <BsCurrencyRupee />
                <span>{totalPrice}</span>
              </div>

              <div className="col-span-8  font-semibold">Discount</div>
              <div className="col-span-4 font-medium text-green-600 flex items-center tracking-wider">
                <span>{Number(totalDiscount).toFixed(0)}</span>
                <AiOutlinePercentage />
              </div>

              <div className="col-span-8  font-semibold">Delivery Charges</div>
              <div className="col-span-4 font-medium text-green-600 flex items-center tracking-wider">
                <span>Free</span>
              </div>

              <div className="col-span-12 border-b border-gray-400"></div>

              <div className="col-span-8  font-bold text-lg">Final Price</div>
              <div className="col-span-4 font-bold text-gray-600 flex items-center tracking-wider">
                <BsCurrencyRupee />
                <span>{Number(finalPrice).toFixed(0)} /-</span>
              </div>

              <div className="col-span-12 text-green-600 font-semibold">You will save Rs. {saveAmount}</div>
            </div>

            <button
              disabled={!products.length}
              className="mt-4 bg-lime-400 py-2 disabled:bg-lime-200 disabled:text-gray-400 cursor-not-allowed block w-full font-semibold">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Cart;
