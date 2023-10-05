import SubHeading from "@/elements/SubHeading";
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
  const images = getImageList(product?.id);
  const totalPrice = calculateTotalPrice(product?.price, product?.discountPercentage);
  const { products } = useSelector((state: RootState) => state.cart);
  const [currentImageNum, setCurrentImageNum] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const categoryURL = `/collections/category/${product?.category}`;
  const brandURL = `/collections/brand/${product?.brand}`;

  useEffect(() => {
    if (router.query.id) setCurrentImageNum(0);
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
        <div className="grid lg:grid-cols-12 gap-y-16 sm:gap-14 xl:gap-20 items-center w-full">
          <div className="col-span-8 lg:col-span-5">
            <figure className="relative h-[400px] w-full shadow p-4">
              <NextImg src={images[currentImageNum]} className="object-contain h-full" height={400} width={400} alt={product.title || "Product"} />
            </figure>

            <div className="grid grid-cols-5 gap-4 mt-8">
              {images.map((image, index) => (
                <figure
                  key={index}
                  className={`relative p-2 transition shadow w-full h-20 overflow-hidden cursor-pointer ${index === currentImageNum && "active"}`}
                  onClick={() => setCurrentImageNum(index)}>
                  <NextImg src={image} className="object-cover" height={100} width={100} alt={"Product"} />
                </figure>
              ))}
            </div>
          </div>

          <div className="col-span-8 lg:col-span-7">
            <div className="text-grey uppercase tracking-widest text-xs font-semibold space-x-6 mb-1">
              <Link href={categoryURL}>{product?.category.replaceAll("-", " ")}</Link>
              <Link href={brandURL}>{product?.brand.toLowerCase()}</Link>
            </div>

            <SubHeading text={product?.title.toLowerCase()} className="mb-0 tracking-wider leading-[1.3] capitalize" />

            <div className="flex items-center my-2">
              <div className="flex items-center text-dark font-bold text-xl">
                <BsCurrencyRupee />
                <span className="font-bold">{Number(totalPrice).toFixed()}</span>
              </div>

              <span className="pl-2 pr-1 text-gray-400"> - </span>

              <div className="flex items-center line-through text-gray-400 text-base">
                <BsCurrencyRupee />
                <span>{product?.price}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Ratings className="w-auto" rating={product?.rating} selectedRating={product?.rating} showUpText={false} />
              <span className="inline-block text-sm text-grey font-medium">(2)</span>
            </div>

            <p className="leading-7  tracking-wide my-6 ">{product?.description}</p>

            <div className="flex items-center space-x-6">
              <button onClick={() => {}} className={`block border-2 w-[160px] border-primary text-xs text-dark font-semibold h-12 uppercase tracking-wide`}>
                Add to wishlist
              </button>

              <button
                onClick={handleCart}
                className={`block border-2 w-[160px] ${isAddedToCart ? "bg-red-400" : "bg-primary"} text-xs text-white font-semibold h-12 uppercase tracking-wide`}>
                {isAddedToCart ? "Remove from" : "Add to"} cart
              </button>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default MainProduct;
