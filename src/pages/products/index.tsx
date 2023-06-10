import Spinner from "@/elements/Spinner";
import { IProduct } from "@/lib/types";
import ProductCard from "@/shared/ProductCard";
import SectionContainer from "@/shared/SectionContainer";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

const useFetchProducts = (skip: number, setSkip: Dispatch<SetStateAction<number>>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const limit = 20;

  const fetchData = async () => {
    console.log("fetch data");

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products?limit=${limit}&skip=${skip}`);
      const data = await response.json();
      if (data.status === "success" && data.result.length) {
        setProducts((prev) => [...prev, ...data.result]);
        setIsLoading(false);
        setHasMore(() => {
          if (data.skip < data.total) return true;
          return false;
        });
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [skip]);

  const observer: any = useRef(null);
  const lastProductElementRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setSkip((prev) => prev + limit);
          }
        },
        { threshold: 0.75 }
      );
      if (node && observer?.current) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return {
    isLoading,
    isError,
    products,
    hasMore,
    limit,
    lastProductElementRef,
  };
};

const Products = () => {
  const [skip, setSkip] = useState(0);

  const { isError, isLoading, products, lastProductElementRef } = useFetchProducts(skip, setSkip);

  return (
    <SectionContainer>
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
        {products.length
          ? products.map((product, index) => {
              if (products.length === index + 1) {
                return (
                  <div key={product._id} ref={lastProductElementRef}>
                    <ProductCard {...product} />
                  </div>
                );
              }

              return (
                <div key={product._id}>
                  <ProductCard {...product} />
                </div>
              );
            })
          : null}
      </div>
      {isLoading && <Spinner />}
      {isError && <h2 className="text-3xl">Failed to fetch products</h2>}
    </SectionContainer>
  );
};

export default Products;
