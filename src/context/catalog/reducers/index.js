import CATALOG from "../constants";

const initialState = {
  catalog: []
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

    default:
      return state;
  }
}

export default catalogReducer;
