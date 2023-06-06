import { secondaryFont } from "@/lib/fonts";
import { IProduct } from "@/lib/types";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";
import { default as NextImage } from "next/image";
import { default as Link } from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

interface ProductCardprops extends IProduct {}

const ProductCard: React.FC<ProductCardprops> = ({
  title,
  category,
  price,
  discountPercentage,
  id,
  rating,
  ...rest
}) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    const findProduct = products.find((product) => product.id === id);
    if (findProduct) {
      setIsAddedToCart(true);
    }
  }, []);

  const handleCart = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (isAddedToCart) {
      dispatch(removeFromCart({ id }));
      setIsAddedToCart(false);
    } else {
      dispatch(
        addToCart({
          title,
          category,
          price,
          discountPercentage,
          id,
          rating,
          numberOfItemsSelected: 1,
          ...rest,
        })
      );
      setIsAddedToCart(true);
    }
  };

  return (
    <>
      <Link
        href={`/product/${id}`}
        key={id}
        className="bg-gray-100 rounded-2xl overflow-hidden relative">
        <figure className="h-60  relative">
          <NextImage
            src={`http://localhost:5000/product_${id}/image_1.jpg`}
            fill
            alt={title}
          />
        </figure>

        <div className="mb-10 p-4">
          <p className="text-[10px] tracking-wider text-gray-400 font-bold uppercase">
            {category}
          </p>
          <h3
            className={`${secondaryFont.className} text-xl sm:text-lg tracking-wider font-semibold text-gray-600 my-1`}>
            {title}
          </h3>
          <div className="flex items-center justify-between ">
            <div className="flex items-center pt-2">
              <span>
                <BsCurrencyRupee />
              </span>

              <span className="text-lg font-semibold text-gray-700">
                {Number(price - price / discountPercentage).toFixed()} /
              </span>
              <span className="text-xs ml-1 items-end line-through">
                {price}
              </span>
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
            isAddedToCart ? "bg-red-400" : "bg-lime-400"
          } text-xs font-bold w-full py-3 uppercase tracking-wide absolute bottom-0 left-0`}>
          {isAddedToCart ? "Remove from" : "Add to"} cart
        </button>
      </Link>
    </>
  );
};

export default ProductCard;
