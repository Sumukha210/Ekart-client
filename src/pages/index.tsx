import SubHeading from "@/elements/SubHeading";
import Categories from "@/layout/home/Categories";
import HeroCarousel from "@/layout/home/HeroCarousel";
import { IProduct } from "@/lib/types";
import { useGetFeaturedTopRatedProductsQuery } from "@/redux/api/productApi";
import ProductCard from "@/shared/ProductCard";
import SectionContainer from "@/shared/SectionContainer";

const FeaturedTopRatedProduct: React.FC<{ param: string }> = ({ param }) => {
  const { data, isLoading, isError } =
    useGetFeaturedTopRatedProductsQuery(param);

  if (isError) return <></>;
  if (isLoading) return <>Loading....</>;

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data?.result.map((product: IProduct) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </>
  );
};

const Home = () => {
  return (
    <>
      <HeroCarousel />

      <SectionContainer>
        <SubHeading text="Featured Products" />
        <FeaturedTopRatedProduct param="&featured=true" />
      </SectionContainer>

      <Categories />

      <SectionContainer>
        <SubHeading text="Top Rated Products" />
        <FeaturedTopRatedProduct param="&topRated=1" />
      </SectionContainer>
    </>
  );
};
export default Home;
