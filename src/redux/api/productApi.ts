// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    getFeaturedTopRatedProducts: builder.query({
      query: (param) => `/products?limit=4${param}`,
    }),
    getCategories: builder.query({
      query: () => `/products/categories`,
    }),
    getProducts: builder.query({
      query: (params: string = "limit=20&skip=0") => `/products?${params}`,
    }),
    getBrands: builder.query({
      query: () => `/products/brands`,
    }),
  }),
});

export const { useGetFeaturedTopRatedProductsQuery, useGetCategoriesQuery, useGetProductsQuery, useGetBrandsQuery } = productApi;
