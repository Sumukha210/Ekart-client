import { IProduct } from "@/lib/types";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

export const useFetchProducts = (skip: number, setSkip: Dispatch<SetStateAction<number>>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState<null | number>(null);
  const limit = 35;

  const fetchData = async () => {
    console.log("fetch data");

    if (total != null && skip > total) {
      setHasMore(false);
      setIsLoading(false);
      setIsError(false);
      return;
    }

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
        setTotal(data.total);
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
