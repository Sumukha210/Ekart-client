import { secondaryFont } from "@/lib/fonts";
import { IProductItem } from "@/lib/types";
import { calculateTotalPrice } from "@/lib/utils";
import {
  changeProduct,
  decreaseProduct,
  increaseProduct,
} from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";
import NextImage from "next/image";
import { ChangeEvent, useState } from "react";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "./ConfirmDialog";

interface CartItemprops extends IProductItem {}

const CartItem: React.FC<CartItemprops> = ({
  title,
  rating,
  category,
  id,
  price,
  discountPercentage,
  stock,
}) => {
  // const [numberOfProductInput, setNumberOfProductInput] = useState(1);
  const [showDialog, setShowDialog] = useState(false);

  const dispatch = useDispatch();
  const totalPrice = calculateTotalPrice(price, discountPercentage);
  const products = useSelector((state: RootState) => state.cart.products);
  const product = products.find((product) => product.id === id);

  const handleRemoveFromCart = () => {
    setShowDialog(true);
  };

  const handleProductInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value <= stock && value >= 1) {
      dispatch(changeProduct({ id, value }));
    }
  };

  const handleIncreaseProduct = () => {
    if ((product?.numberOfItemsSelected || 0) < stock) {
      dispatch(increaseProduct({ id }));
    }
  };

  const handleDecreaseProduct = () => {
    if ((product?.numberOfItemsSelected || 0) >= 1) {
      dispatch(decreaseProduct({ id }));
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen w-screen bg-black opacity-40 z-30 transition ${
          showDialog ? "visible" : "invisible"
        }`}></div>

      <ConfirmDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        title={title}
        id={id}
      />

      <div className="grid grid-cols-12 gap-12 mb-10 items-center bg-white border border-borderColor rounded-xl p-4 shadow-sm">
        <div className="col-span-4">
          <figure className="h-40 w-4/5 mx-auto bg-lime-300 relative">
            <NextImage
              src={`http://localhost:5000/product_${id}/image_1.jpg`}
              fill={true}
              alt={title}
              className="w-full"
            />
          </figure>

          <div className="flex items-center gap-3 mt-4">
            <button
              disabled={(product?.numberOfItemsSelected || 0) <= 1}
              onClick={handleDecreaseProduct}
              className="h-7 w-7 p-2 rounded-full bg-lime-300  flex items-center justify-center disabled:opacity-40">
              <AiOutlineMinus />
            </button>

            <input
              type="number"
              value={product?.numberOfItemsSelected || 1}
              onChange={handleProductInput}
              className="w-full h-7 rounded-sm border border-gray-300 flex-2 px-2"
            />
            <button
              disabled={(product?.numberOfItemsSelected || 0) >= stock}
              onClick={handleIncreaseProduct}
              className="h-7 w-7 p-2 rounded-full bg-lime-300  flex items-center justify-center disabled:opacity-40">
              <AiOutlinePlus />
            </button>
          </div>
        </div>

        <div className="col-span-8">
          <p className="text-sm capitalize tracking-widest font-medium text-gray-400">
            {category}
          </p>

          <h3
            className={`text-2xl font-semibold mb-2 ${secondaryFont.className}`}>
            {title}
          </h3>

          <div className="flex items-center">
            <AiFillStar className="text-yellow-400 text-xl" />
            <span className="text-sm font-medium">{rating}</span>
          </div>

          <div className="flex items-center mt-2">
            <span>
              <BsCurrencyRupee />
            </span>

            <span className="text-xl font-semibold text-gray-700">
              {Number(totalPrice).toFixed()} /
            </span>
            <span className="text-xs ml-1 items-end line-through">{price}</span>
          </div>

          <button
            onClick={handleRemoveFromCart}
            className="bg-red-500 mt-8 font-semibold text-white text-sm px-8 py-2 rounded-full">
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
