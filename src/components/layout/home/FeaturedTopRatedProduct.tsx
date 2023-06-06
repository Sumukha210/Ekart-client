import SubHeading from "@/elements/SubHeading";
import { IProduct } from "@/lib/types";
import { useGetFeaturedTopRatedProductsQuery } from "@/redux/api/productApi";
import ProductCard from "@/shared/ProductCard";

interface FeaturedTopRatedProductprops {
  heading: string;
  params: string;
}

const FeaturedTopRatedProduct: React.FC<FeaturedTopRatedProductprops> = ({
  heading,
  params,
}) => {
  const { data, isLoading, isError } =
    useGetFeaturedTopRatedProductsQuery(params);

  if (isError) return <h5>Failed to fetch {heading}</h5>;
  if (isLoading) return <>Loading....</>;

  return (
    <>
      <SubHeading text={heading} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data?.result.map((product: IProduct) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default FeaturedTopRatedProduct;
