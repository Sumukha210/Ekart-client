import { IProductItem } from "@/lib/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  products: IProductItem[];
}

const initialState: CartState = {
  products: [],
};

export const EKART_CART = "ekart_cart";

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addAllToCart: (state, action: PayloadAction<IProductItem[]>) => {
      state.products = action.payload;
    },

    addToCart: (state, action: PayloadAction<IProductItem>) => {
      state.products.push(action.payload);
      localStorage.setItem(EKART_CART, JSON.stringify(state.products));
    },

    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const newProduts = state.products.filter((product) => product.id !== action.payload.id);
      state.products = newProduts;
      localStorage.setItem(EKART_CART, JSON.stringify(state.products));
    },

    changeProduct: (state, action: PayloadAction<{ id: number; value: number }>) => {
      state.products.forEach((product) => {
        if (product.id === action.payload.id) {
          if (action.payload.value <= product.stock && action.payload.value >= 1) {
            product.numberOfItemsSelected = action.payload.value;
          }
        }
      });
    },

    increaseProduct: (state, action: PayloadAction<{ id: number }>) => {
      state.products.forEach((product) => {
        if (product.id === action.payload.id) {
          if (product.numberOfItemsSelected <= product.stock) {
            product.numberOfItemsSelected += 1;
          }
        }
      });
    },

    decreaseProduct: (state, action: PayloadAction<{ id: number }>) => {
      state.products.forEach((product) => {
        if (product.id === action.payload.id) {
          if (product.numberOfItemsSelected >= 1) {
            product.numberOfItemsSelected -= 1;
          }
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, addAllToCart, removeFromCart, increaseProduct, decreaseProduct, changeProduct } = cartSlice.actions;

export default cartSlice.reducer;
