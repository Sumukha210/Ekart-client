import { IProductItem } from "@/lib/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface productListInitialState {
  products: IProductItem[];
  isSideBarOpen: boolean;
  selectedCategory: string[];
  selectedBrand: string[];
  selectedRating: number | null;
  price: number;
  sortBy: string;
  skip: number;
  limit: number;
}

const initialState: productListInitialState = {
  products: [],
  isSideBarOpen: true,
  selectedCategory: [],
  selectedBrand: [],
  selectedRating: null,
  price: 1,
  sortBy: "popularity",
  skip: 0,
  limit: 20,
};

export const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.isSideBarOpen = action.payload;
    },

    togglePrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },

    selectCategory: (state, action: PayloadAction<{ category: string; isSelected: boolean }>) => {
      if (!action.payload.isSelected) {
        state.selectedCategory.push(action.payload.category);
      } else {
        state.selectedCategory = state.selectedCategory.filter((categoryItem) => categoryItem !== action.payload.category);
      }
    },

    selectBrand: (state, action: PayloadAction<{ brand: string; isSelected: boolean }>) => {
      if (!action.payload.isSelected) {
        state.selectedBrand.push(action.payload.brand);
      } else {
        state.selectedBrand = state.selectedBrand.filter((categoryItem) => categoryItem !== action.payload.brand);
      }
    },

    selectRating: (state, action: PayloadAction<number>) => {
      state.selectedRating = action.payload;
    },

    selectSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { toggleSidebar, togglePrice, selectCategory, selectBrand, selectRating, selectSortBy } = productListSlice.actions;

export default productListSlice.reducer;
