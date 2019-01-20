import CATALOG from "../constants";

const initialState = {
  catalog: [],
  categories: [],
  colors: [],
  currentImage: null
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
      return {
        catalog: state.catalog.filter(item => {
          return item.id !== payload.id;
        })
      };
    case CATALOG.ADD_COLOR:
      return {
        ...state,
        colors: [...state.colors, payload]
      };
    case CATALOG.EDIT_COLOR:
      return {
        ...state,
        colors: state.colors
          .filter(item => {
            return item.id !== payload.id;
          })
          .concat(payload)
      };
    case CATALOG.REMOVE_COLOR:
      return {
        ...state,
        colors: state.colors.filter(item => {
          return item.id !== payload.id;
        })
      };
    case CATALOG.ON_FILE_LOADED:
      return {
        ...state,
        currentImage: payload
      };
    case CATALOG.ON_FILE_SAVED:
      return {
        ...state,
        currentImage: null
      };
    case CATALOG.ON_FILE_CLEAR:
      return {
        ...state,
        currentImage: payload
      };
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
