import PageHeading from "@/elements/PageHeading";
import { IProduct } from "@/lib/types";
import { calculateTotalPrice } from "@/lib/utils";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";
import SectionContainer from "@/shared/modules/SectionContainer";
import NextImg from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Ratings from "../productList/ProductFilterMenu/Ratings";

interface MainProductprops {
  product: IProduct;
}

const getImageList = (baseId: number) => {
  const images: string[] = [];

  for (let i = 1; i <= 5; i++) {
    images.push(`${process.env.NEXT_PUBLIC_BASE_URL}/product_${baseId}/image_${i}.jpg`);
  }

  return images;
};

const MainProduct: React.FC<MainProductprops> = ({ product }) => {
  const router = useRouter();
  const images = getImageList(product.id);
  const totalPrice = calculateTotalPrice(product?.price, product?.discountPercentage);
  const { products } = useSelector((state: RootState) => state.cart);
  const [currentImageNum, setCurrentImageNum] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentImageNum(0);
  }, [router.query.id]);

  useEffect(() => {
    const findProduct = products.find((item) => item.id === product?.id);
    if (findProduct) setIsAddedToCart(true);
  }, []);

  const handleCart = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    if (isAddedToCart) {
      dispatch(removeFromCart({ id: product?.id }));
      setIsAddedToCart(false);
    } else {
      dispatch(addToCart({ ...product, numberOfItemsSelected: 1 }));
      setIsAddedToCart(true);
    }
  };

  return (
    <>
      <SectionContainer>
        <div className="grid grid-cols-12 gap-20 items-center">
          <div className="col-span-5">
            <figure className="relative h-[400px] ">
              <NextImg src={images[currentImageNum]} className="h-full w-full" fill alt={product.title || "Product"} />
            </figure>

            <div className="grid grid-cols-5 gap-2 mt-8">
              {images.map((image, index) => (
                <figure key={index} className="relative border border-gray-300 h-20 overflow-hidden cursor-pointer" onClick={() => setCurrentImageNum(index)}>
                  <NextImg src={image} className="object-cover h-full" height={100} width={100} alt={"Product"} />
                </figure>
              ))}
            </div>
          </div>

          <div className="col-span-6">
            <Link className="text-gray-500 uppercase tracking-widest text-xs font-bold" href={`/collections?category=${product?.category}`}>
              {product?.category.replaceAll("-", " ")}
            </Link>
            <div className="mb-2">
              <PageHeading text={product?.title.toLowerCase()} allowBottomLine={false} className="mb-0 capitalize tracking-wider leading-[1.3]" />
              <Link href={`/collections?brand=${product?.brand}`} className={` mt-1 text-xl block capitalize font-medium text-gray-400 tracking-wider`}>
                by {product?.brand.toLowerCase()}
              </Link>
            </div>

            <p className="leading-6 tracking-wide mb-4 capitalize">{product?.description.toLowerCase()}</p>
            <Ratings rating={product?.rating} selectedRating={product?.rating} showUpText={false} />
            <div className="mt-3 flex items-center">
              <div className="flex items-center text-2xl">
                <BsCurrencyRupee />
                <span className="font-semibold">{Number(totalPrice).toFixed()}</span>
              </div>

              <span className="pl-2 pr-1 text-gray-400 text-2xl">/</span>

              <div className="flex items-center text-sm line-through text-gray-400">
                <BsCurrencyRupee />
                <span className="font-semibold ">{product?.price}</span>
              </div>
            </div>

            <button
              onClick={handleCart}
              className={`mt-8 inline-block px-8 ${isAddedToCart ? "bg-red-400" : "bg-lime-400"} text-xs font-bold  py-3 uppercase tracking-wide`}>
              {isAddedToCart ? "Remove from" : "Add to"} cart
            </button>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default MainProduct;
