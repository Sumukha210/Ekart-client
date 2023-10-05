import FetchErrorMessage from "@/elements/FetchErrorMessage";
import LinkButton from "@/elements/LinkButton";
import Spinner from "@/elements/Spinner";
import SubHeading from "@/elements/SubHeading";
import MainProduct from "@/layout/individualProduct/MainProduct";
import { secondaryFont } from "@/lib/fonts";
import { IProduct } from "@/lib/types";
import { useGetProductByIdQuery } from "@/redux/api/productApi";
import ProductCard from "@/shared/modules/ProductCard";
import SectionContainer from "@/shared/modules/SectionContainer";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProductDetails = () => {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useGetProductByIdQuery((router.query?.id as string) || "");

  useEffect(() => {
    if (!router.query.id || typeof router.query.id === "number") {
      router.push("/collections");
    }
  }, [router.query.id]);

  if (isLoading) {
    return (
      <div className="mx-auto text-center mt-10">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {isLoading && <Spinner />}

      {router.query?.id && typeof router.query.id === "number" ? (
        <FetchErrorMessage handleRefetch={() => refetch()} isError={isError} />
      ) : (
        <div className="text-center my-20">
          <h4 className={`${secondaryFont.className} text-grey text-5xl mb-6`}>Product must be number</h4>
          <LinkButton href="/collections" className="bg-transparent border-2 border-primary text-dark">
            View Collections
          </LinkButton>
        </div>
      )}

      {!isError && !isLoading && data?.status === "success" && !Array.isArray(data?.result) && <MainProduct product={data.result} />}

      {!isError && !isLoading && data?.result?.similarProducts?.length ? (
        <SectionContainer>
          <SubHeading text="Similar Products" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.result.similarProducts.map((product: IProduct) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        </SectionContainer>
      ) : null}
    </>
  );
};

export default ProductDetails;
