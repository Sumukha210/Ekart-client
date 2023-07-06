import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi";
import cartReducer from "./slices/cartSlice";
import productListReducer from "./slices/productListSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    productList: productListReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
