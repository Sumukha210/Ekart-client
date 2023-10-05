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
  appliedFilter: ("Brand" | "Category" | "Price" | "Rating")[];
}

type ClearAction = { type: "clear" };
type CategoryAction = { type?: "add"; category: string; isSelected: boolean } | ClearAction;
type BrandAction = { type?: "add"; isSelected: boolean; brand: string } | ClearAction;
type RatingPriceAction = { type?: "add"; value: number } | ClearAction;

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
  appliedFilter: [],
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

    togglePrice: (state, action: PayloadAction<RatingPriceAction>) => {
      if (action.payload.type === "clear") {
        state.price = 1;
        state.appliedFilter = state.appliedFilter.filter((item) => item !== "Price");
        urlParams.delete("priceBetween");
        state.urlParams = urlParams.toString();
      } else {
        state.price = action.payload.value;
      }
    },

    selectCategory: (state, action: PayloadAction<CategoryAction>) => {
      if (action.payload.type === "clear") {
        state.selectedCategory.length = 0;
        state.appliedFilter = state.appliedFilter.filter((item) => item !== "Category");
        urlParams.delete("categories");
        state.urlParams = urlParams.toString();
      } else {
        const { category, isSelected } = action.payload;

        if (!isSelected) {
          state.selectedCategory.push(category);
        } else {
          state.selectedCategory = state.selectedCategory.filter((categoryItem) => categoryItem !== category);
        }
      }
    },

    selectBrand: (state, action: PayloadAction<BrandAction>) => {
      if (action.payload.type === "clear") {
        state.selectedBrand.length = 0;
        state.appliedFilter = state.appliedFilter.filter((item) => item !== "Brand");
        urlParams.delete("brands");
        state.urlParams = urlParams.toString();
      } else {
        const { brand, isSelected } = action.payload;

        if (!isSelected) {
          state.selectedBrand.push(action.payload.brand);
        } else {
          state.selectedBrand = state.selectedBrand.filter((brandItem) => brandItem !== brand);
        }
      }
    },

    selectRating: (state, action: PayloadAction<RatingPriceAction>) => {
      if (action.payload.type === "clear") {
        state.selectedRating = null;
        state.appliedFilter = state.appliedFilter.filter((item) => item !== "Rating");
        urlParams.delete("ratings");
        state.urlParams = urlParams.toString();
      } else {
        state.selectedRating = action.payload.value;
      }
    },

    selectSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
      urlParams.set("sortBy", action.payload);
      urlParams.set("skip", "0");
      state.currentPage = 1;
      state.urlParams = urlParams.toString();
    },

    viewResult: (state) => {
      const { selectedBrand, selectedCategory, selectedRating, price, appliedFilter } = state;

      if (selectedRating) {
        urlParams.set("ratings", selectedRating.toString());
        appliedFilter.push("Rating");
      }

      if (selectedBrand.length) {
        urlParams.set("brands", selectedBrand.join());
        appliedFilter.push("Brand");
      } else {
        urlParams.delete("brands");
      }

      if (selectedCategory.length) {
        urlParams.set("categories", selectedCategory.join());
        if (!appliedFilter.includes("Category")) appliedFilter.push("Category");
      } else {
        urlParams.delete("categories");
      }

      if (price > 1) {
        urlParams.set("priceBetween", `1,${price}`);
        appliedFilter.push("Price");
      }

      state.currentPage = 1;
      state.urlParams = urlParams.toString();
      state.isSideBarOpen = false;
    },

    setNavigteFilters: (state, action: PayloadAction<{ filter: "category" | "brand"; value: string }>) => {
      const { filter, value } = action.payload;

      if (filter === "brand" && !state.selectedBrand.includes(value)) {
        urlParams.set("brands", value);
        state.selectedBrand.push(value);
        state.urlParams = urlParams.toString();

        if (!state.appliedFilter.includes("Brand")) state.appliedFilter.push("Brand");
      }
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
      state.appliedFilter.length = 0;
    },
  },
});

export const { toggleSidebar, togglePrice, clearMenuFilters, setPage, selectCategory, selectBrand, selectRating, selectSortBy, viewResult, setNavigteFilters } =
  productListSlice.actions;

export default productListSlice.reducer;
