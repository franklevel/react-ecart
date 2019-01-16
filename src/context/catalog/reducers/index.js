import CATALOG from "../constants";

const initialState = {
  catalog: [],
  categories: []
};

function catalogReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CATALOG.ADD_PRODUCT:
      return {
        ...state,
        catalog: [...state.catalog, payload]
      };

    case CATALOG.EDIT_PRODUCT:
      return [...state.catalog, payload];

    case CATALOG.REMOVE_PRODUCT:
      return [...state.catalog, payload];

    case CATALOG.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload]
      };

    default:
      return state;
  }
}

export default catalogReducer;
