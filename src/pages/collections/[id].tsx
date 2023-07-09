import Spinner from "@/elements/Spinner";
import SubHeading from "@/elements/SubHeading";
import MainProduct from "@/layout/individualProduct/MainProduct";
import { IProduct } from "@/lib/types";
import { useGetProductByIdQuery } from "@/redux/api/productApi";
import ProductCard from "@/shared/modules/ProductCard";
import SectionContainer from "@/shared/modules/SectionContainer";
import { useRouter } from "next/router";

const ProductDetails = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetProductByIdQuery(router.query?.id as string);

  if (isLoading) {
    return (
      <div className="mx-auto text-center mt-10">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto text-center mt-10">
        <h3 className="text-2xl text-gray-500">Failed fetch! Please refresh the page</h3>
      </div>
    );
  }

  return (
    <>
      <MainProduct product={data?.result} />

      {data?.result?.similarProducts.length ? (
        <SectionContainer>
          <SubHeading text="Similar Products" />
          <div className="grid grid-cols-4 gap-6">
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
