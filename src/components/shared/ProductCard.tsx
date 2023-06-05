import { secondaryFont } from "@/lib/fonts";
import { IProduct } from "@/lib/types";
import { default as NextImage } from "next/image";
import { default as Link } from "next/link";
import { AiFillStar } from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";

interface ProductCardprops extends IProduct {}

const ProductCard: React.FC<ProductCardprops> = ({
  title,
  category,
  price,
  discountPercentage,
  id,
  rating,
}) => {
  return (
    <>
      <Link
        href={`/product/${id}`}
        key={id}
        className="bg-gray-100 rounded-2xl overflow-hidden relative">
        <figure className="h-60 bg-lime-300 relative">
          <NextImage
            src={`http://localhost:5000/product_${id}/image_1.jpg`}
            fill
            alt={title}
          />
        </figure>

        <div className="mb-10 p-4">
          <p className="text-xs tracking-wider text-gray-400 font-bold uppercase">
            {category}
          </p>
          <h3
            className={`${secondaryFont.className} text-lg tracking-wide font-semibold text-gray-600 my-1`}>
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
              <span className="text-xs ml-1"> {price}</span>
            </div>

            <div className="flex items-center">
              <AiFillStar className="text-yellow-400 text-2xl" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
        </div>

        <button
          className={`mt-2 block bg-lime-400 text-xs font-bold w-full py-3 uppercase tracking-wide absolute bottom-0 left-0`}>
          Add to cart
        </button>
      </Link>
    </>
  );
};

export default ProductCard;
