import PageHeading from "@/elements/PageHeading";
import Spinner from "@/elements/Spinner";
import { secondaryFont } from "@/lib/fonts";
import { IProduct } from "@/lib/types";
import { useGetProductsQuery } from "@/redux/api/productApi";
import ProductCard from "@/shared/modules/ProductCard";
import SectionContainer from "@/shared/modules/SectionContainer";
import { useRouter } from "next/router";

interface Categoryprops {}

const Category: React.FC<Categoryprops> = () => {
  const router = useRouter();

  const { isLoading, data, isError } = useGetProductsQuery(`&categories=${router.query?.name}&limit=100`);

  console.log(router.query.name, "name");

  return (
    <SectionContainer className="mt-6">
      <header className="text-center">
        <PageHeading text={router.query.name as string} allowBottomLine={false} className="capitalize" />
      </header>

      {isLoading && <Spinner />}

      {/* {router.query?.name ? <FetchErrorMessage handleRefetch={() => refetch()} isError={isError} /> : <LinkButton href="/collection">View Collections</LinkButton>} */}

      {!isLoading &&
        !isError &&
        (data?.result.length ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
            {data?.result?.map((product: IProduct) => (
              <ProductCard {...product} key={product._id} />
            ))}
          </div>
        ) : (
          <h3 className={`${secondaryFont.className} text-center font-semibold text-3xl mt-20 text-gray-400`}>There is no product found</h3>
        ))}
    </SectionContainer>
  );
};

export default Category;
