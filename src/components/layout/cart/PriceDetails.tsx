import { calculateTotalPrice } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { BsCurrencyRupee } from "react-icons/bs";
import { useSelector } from "react-redux";

interface PriceDetailsprops {}

const PriceDetails: React.FC<PriceDetailsprops> = () => {
  const products = useSelector((state: RootState) => state.cart.products);

  const subTotal = products.reduce((acc, current) => acc + calculateTotalPrice(current.price, current.discountPercentage), 0);
  const totalPrice = products.reduce((acc, current) => acc + calculateTotalPrice(current.price * current.numberOfItemsSelected, current.discountPercentage), 0);
  const finalPrice = totalPrice > 200 ? totalPrice : totalPrice + 80;

  return (
    <>
      <div className="bg-white border  overflow-hidden">
        <div className="grid grid-cols-12 gap-x-6 gap-y-4 p-4">
          <div className="col-span-8 text-grey">Sub Total</div>
          <div className="col-span-4 font-bold text-gray-600 tracking-wider flex items-center">
            <BsCurrencyRupee />
            <span>{Number(subTotal).toFixed()}</span>
          </div>

          <div className="col-span-8 text-grey">Total Price</div>
          <div className="col-span-4 font-bold text-gray-600 tracking-wider flex items-center">
            <BsCurrencyRupee />
            <span>{Number(totalPrice).toFixed()}</span>
          </div>

          <div className="col-span-8 text-grey ">Delivery Charges</div>
          <div className="col-span-4 font-bold text-gray-600 tracking-wider flex items-center">
            <BsCurrencyRupee />
            <span>{totalPrice > 200 ? "Free" : 80}</span>
          </div>

          <div className="col-span-12 border-b border-gray-400"></div>

          <div className={`col-span-8  font-medium text-primary text-lg`}>Final Price</div>
          <div className="col-span-4 font-bold text-gray-600 flex items-center tracking-wider">
            <BsCurrencyRupee />
            <span>{Number(finalPrice).toFixed(0)} /-</span>
          </div>
        </div>

        <button disabled={!products.length} className="mt-4 bg-primary text-white py-2 disabled:opacity-50 cursor-not-allowed block w-full font-medium">
          Place Order
        </button>
      </div>
    </>
  );
};

export default PriceDetails;
