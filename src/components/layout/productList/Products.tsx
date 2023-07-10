import FetchErrorMessage from "@/elements/FetchErrorMessage";
import Spinner from "@/elements/Spinner";
import { secondaryFont } from "@/lib/fonts";
import { IProduct } from "@/lib/types";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { setPage } from "@/redux/slices/productListSlice";
import { RootState } from "@/redux/store";
import ProductCard from "@/shared/modules/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";

interface Productsprops {}

const Products: React.FC<Productsprops> = () => {
  const currentPage = useSelector((state: RootState) => state.productList.currentPage);
  const limit = useSelector((state: RootState) => state.productList.limit);
  const urlParams = useSelector((state: RootState) => state.productList.urlParams);
  const dispatch = useDispatch();

  const { isLoading, data, isError, refetch } = useGetProductsQuery(urlParams);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <>
      {isLoading && <Spinner />}

      <FetchErrorMessage handleRefetch={() => refetch()} isError={isError} />

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

      {!isLoading && !isError && data?.total ? (
        <div className="mt-16">
          <Pagination totalProducts={data.total} productsPerPage={limit} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      ) : null}
    </>
  );
};

export default Products;
