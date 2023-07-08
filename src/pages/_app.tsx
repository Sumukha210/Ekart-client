import Navbar from "@/shared/Navbar";
import "@/styles/globals.css";
import { Provider, useDispatch } from "react-redux";

import { EKART_CART, addAllToCart } from "@/redux/slices/cartSlice";
import { store } from "@/redux/store";
import Footer from "@/shared/Footer";
import type { AppProps } from "next/app";
import { useEffect } from "react";

const GetCartItemsFromLocalStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = localStorage.getItem(EKART_CART);

    if (getProducts) {
      dispatch(addAllToCart(JSON.parse(getProducts)));
    }
  }, []);

  return <></>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar />
      <GetCartItemsFromLocalStorage />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}
