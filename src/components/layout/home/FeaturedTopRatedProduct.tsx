import FetchErrorMessage from "@/elements/FetchErrorMessage";
import SubHeading from "@/elements/SubHeading";
import { IProduct } from "@/lib/types";
import { useGetFeaturedTopRatedProductsQuery } from "@/redux/api/productApi";
import ProductCard from "@/shared/modules/ProductCard";

interface FeaturedTopRatedProductprops {
  heading: string;
  params: string;
}

const FeaturedTopRatedProduct: React.FC<FeaturedTopRatedProductprops> = ({ heading, params }) => {
  const { data, isLoading, isError, refetch } = useGetFeaturedTopRatedProductsQuery(params);

  if (isLoading) return <>Loading....</>;

  return (
    <>
      <FetchErrorMessage isError={isError} handleRefetch={() => refetch()} />

      <SubHeading text={heading} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-y-0 sm:gap-x-4 xl:gap-8">
        {data?.result.map((product: IProduct) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default FeaturedTopRatedProduct;
