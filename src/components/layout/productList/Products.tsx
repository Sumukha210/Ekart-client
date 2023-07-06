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

  const { isLoading, data, isError } = useGetProductsQuery(urlParams);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <>
      {isLoading && <Spinner />}

      {isError && (
        <div>
          <h3 className="text-center">Failed to fetch products</h3>{" "}
          <button className="bg-gray-300 px-2 py-1 text-sm" onClick={() => window.location.reload()}>
            Refresh page
          </button>
        </div>
      )}

      {!isLoading &&
        !isError &&
        (data?.result.length ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-7 sm:gap-3 lg:gap-4 mb-10">
            {data?.result?.map((product: IProduct) => (
              <ProductCard {...product} key={product._id} />
            ))}
          </div>
        ) : (
          <h3 className={`${secondaryFont.className} text-center font-semibold text-3xl mt-20 text-gray-400`}>There is no product found</h3>
        ))}

      {!isLoading && !isError && data?.total ? (
        <Pagination totalProducts={data.total} productsPerPage={limit} currentPage={currentPage} onPageChange={handlePageChange} />
      ) : null}
    </>
  );
};

export default Products;
