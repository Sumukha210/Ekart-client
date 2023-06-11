import Categories from "@/layout/home/Categories";
import ChooseUs from "@/layout/home/ChooseUs";
import FeaturedTopRatedProduct from "@/layout/home/FeaturedTopRatedProduct";
import HeroCarousel from "@/layout/home/HeroCarousel";
import SectionContainer from "@/shared/modules/SectionContainer";

const Home = () => {
  return (
    <div className="mt-20">
      <HeroCarousel />

      <ChooseUs />

      <SectionContainer>
        <FeaturedTopRatedProduct params="&featured=true" heading="Featured Products" />
      </SectionContainer>

      <Categories />

      <SectionContainer>
        <FeaturedTopRatedProduct params="&topRated=1" heading="Top Rated Products" />
      </SectionContainer>
    </div>
  );
};
export default Home;
