export interface IFilterState {
  isSideBarOpen: boolean;
  selectedCategory: string[];
  selectedBrand: string[];
  selectedRating: number | null;
  price: number;
  urlParams: string;
  sortBy: string;
  skip: number;
  limit: number;
}

export type Action =
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_URL_PARAMS" }
  | { type: "SET_SKIP" }
  | { type: "SET_SORTBY"; sortBy: string }
  | { type: "SELECT_CATEGORY"; category: string; isSelected: boolean }
  | { type: "SELECT_BRAND"; brand: string; isSelected: boolean }
  | { type: "SELECT_RATING"; rating: number }
  | { type: "SELECT_PRICE"; price: number };

export const initialFilterState: IFilterState = {
  isSideBarOpen: false,
  selectedCategory: [],
  selectedBrand: [],
  selectedRating: null,
  price: 1,
  urlParams: "limit=20&sortBy=popularity&skip=0",
  sortBy: "popularity",
  skip: 0,
  limit: 30,
};

export const filterReducer = (state: IFilterState, action: Action): IFilterState => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        isSideBarOpen: !state.isSideBarOpen,
      };

    case "SET_SKIP": {
      return { ...state, skip: state.skip + state.limit, urlParams: state.urlParams.replace(`skip=${state.skip}`, `skip=${state.skip + state.limit}`) };
    }

    case "SET_URL_PARAMS":
      let urlParams = `sortBy=${state.sortBy}&priceBetween=1,${state.price > 1 ? state.price : 5000}&skip=${state.skip}`;

      if (state.selectedCategory.length) {
        urlParams += `&categories=${state.selectedCategory.join(",")}`;
      }

      if (state.selectedBrand.length) {
        urlParams += `&brands=${state.selectedBrand.join(",")}`;
      }

      if (state.selectedRating) {
        urlParams += `&ratings=${state.selectedRating}`;
      }

      return { ...state, urlParams, isSideBarOpen: false };

    case "SET_SORTBY":
      return { ...state, sortBy: action.sortBy, urlParams: `${state.urlParams}&sortBy=${action.sortBy}` };

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
