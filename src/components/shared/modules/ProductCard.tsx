import { secondaryFont } from "@/lib/fonts";
import { IProduct } from "@/lib/types";
import { calculateTotalPrice } from "@/lib/utils";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";
import { default as NextImage } from "next/image";
import { default as Link } from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

interface ProductCardprops extends IProduct {}

const ProductCard: React.FC<ProductCardprops> = ({ title, category, price, discountPercentage, id, rating, ...rest }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { products } = useSelector((state: RootState) => state.cart);
  const totalPrice = calculateTotalPrice(price, discountPercentage);

  const dispatch = useDispatch();

  const productUrl = `/collections/${rest?._id}?name=${encodeURIComponent(title)}`;

  useEffect(() => {
    const findProduct = products.find((product) => product.id === id);
    if (findProduct) setIsAddedToCart(true);
  }, []);

  const handleCart = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    if (isAddedToCart) {
      dispatch(removeFromCart({ id }));
      setIsAddedToCart(false);
    } else {
      dispatch(addToCart({ title, category, price, discountPercentage, id, rating, numberOfItemsSelected: 1, ...rest }));
      setIsAddedToCart(true);
    }
  };

  return (
    <>
      <Link href={productUrl} title="view product" key={id} className="bg-light overflow-hidden block relative">
        <figure className="relative h-60 sm:pb-[100%] border border-light bg-white">
          <NextImage src={`${process.env.NEXT_PUBLIC_BASE_URL}/product_${id}/image_1.jpg`} fill className="object-contain h-full" alt={title} />
        </figure>

        <div className="mb-10 p-4">
          <p className="text-[10px] tracking-wider text-gray-400 font-bold uppercase">{category}</p>
          <h3 className={`${secondaryFont.className} whitespace-nowrap overflow-hidden text-ellipsis text-xl  tracking-wider text-dark my-1`}>{title}</h3>

          <div className="flex items-center justify-between ">
            <div className="flex items-center pt-2">
              <span>
                <BsCurrencyRupee />
              </span>

              <span className="text-lg font-semibold text-gray-700">{Number(totalPrice).toFixed()} /</span>
              <span className="text-xs ml-1 items-end line-through">{price}</span>
            </div>

            <div className="flex items-center">
              <AiFillStar className="text-yellow-400 text-2xl" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleCart}
          className={`mt-2 block ${
            isAddedToCart ? "bg-red-400" : "bg-primary"
          } text-xs font-medium w-full py-3 uppercase text-white tracking-wider  absolute bottom-0 left-0 hover:opacity-60`}>
          {isAddedToCart ? "Remove from" : "Add to"} cart
        </button>
      </Link>
    </>
  );
};

export default ProductCard;
