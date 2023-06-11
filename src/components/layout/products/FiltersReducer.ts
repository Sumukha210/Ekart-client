export interface IFilterState {
  isSideBarOpen: boolean;
  selectedCategory: string[];
  selectedBrand: string[];
  selectedRating: number | null;
  price: number;
}

export type Action =
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SELECT_CATEGORY"; category: string; isSelected: boolean }
  | { type: "SELECT_BRAND"; brand: string; isSelected: boolean }
  | { type: "SELECT_RATING"; rating: number }
  | { type: "SELECT_PRICE"; price: number };

export const initialFilterState: IFilterState = {
  isSideBarOpen: true,
  selectedCategory: [],
  selectedBrand: [],
  selectedRating: null,
  price: 1,
};

export const filterReducer = (state: IFilterState, action: Action): IFilterState => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        isSideBarOpen: !state.isSideBarOpen,
      };

    case "SELECT_PRICE":
      return {
        ...state,
        price: action.price,
      };

    case "SELECT_CATEGORY":
      return {
        ...state,
        selectedCategory: !action.isSelected
          ? [...state.selectedCategory, action.category]
          : state.selectedCategory.filter((categoryItem) => categoryItem !== action.category),
      };
    case "SELECT_BRAND":
      return {
        ...state,
        selectedBrand: !action.isSelected ? [...state.selectedBrand, action.brand] : state.selectedBrand.filter((brandItem) => brandItem !== action.brand),
      };
    case "SELECT_RATING":
      return {
        ...state,
        selectedRating: action.rating,
      };
    default:
      return state;
  }
};
