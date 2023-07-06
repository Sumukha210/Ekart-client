import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ProductListState {
  isSideBarOpen: boolean;
  selectedCategory: string[];
  selectedBrand: string[];
  selectedRating: number | null;
  price: number;
  sortBy: string;
  skip: number;
  limit: number;
  currentPage: number;
  urlParams: string;
}

const initialState: ProductListState = {
  isSideBarOpen: false,
  selectedCategory: [],
  selectedBrand: [],
  selectedRating: null,
  price: 1,
  sortBy: "popularity",
  skip: 0,
  limit: 20,
  currentPage: 1,
  urlParams: "",
};

export const urlParams = new URLSearchParams(`skip=${initialState.skip}&limit=${initialState.limit}&sortBy=${initialState.sortBy}`);

initialState.urlParams = urlParams.toString();

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

    setPage: (state, action: PayloadAction<number>) => {
      if (action.payload === 1) {
        state.skip = 0;
      } else {
        state.skip = state.limit * (action.payload - 1);
      }
      state.currentPage = action.payload;
      urlParams.set("skip", state.skip.toString());
      state.urlParams = urlParams.toString();
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
      urlParams.set("sortBy", action.payload);
      urlParams.set("skip", "0");
      state.currentPage = 1;
      state.urlParams = urlParams.toString();
    },

    viewResult: (state) => {
      const { selectedBrand, selectedCategory, selectedRating, price } = state;
      if (selectedRating) {
        urlParams.set("ratings", selectedRating.toString());
      }

      if (selectedBrand.length) {
        urlParams.set("brands", selectedBrand.join());
      }

      if (selectedCategory.length) {
        urlParams.set("categories", selectedCategory.join());
      }

      if (price > 1) {
        urlParams.set("priceBetween", `1,${price}`);
      }

      state.currentPage = 1;
      state.urlParams = urlParams.toString();
      state.isSideBarOpen = false;
    },

    clearMenuFilters: (state) => {
      let { selectedBrand, selectedCategory, selectedRating, price } = state;
      if (selectedRating) {
        urlParams.delete("ratings");
      }

      if (selectedBrand.length) {
        urlParams.delete("brands");
      }

      if (selectedCategory.length) {
        urlParams.delete("categories");
      }

      if (price > 1) {
        urlParams.delete("priceBetween");
      }

      selectedBrand.length = 0;
      selectedCategory.length = 0;
      selectedRating = null;
      price = 1;
      state.urlParams = urlParams.toString();
      state.currentPage = 1;
    },
  },
});

export const { toggleSidebar, togglePrice, clearMenuFilters, setPage, selectCategory, selectBrand, selectRating, selectSortBy, viewResult } = productListSlice.actions;

export default productListSlice.reducer;
