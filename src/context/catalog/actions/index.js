import CATALOG from "../constants";

export function CatalogActions(action, payload) {
  switch (action) {
    case CATALOG.ADD_PRODUCT:
      return {
        type: action,
        payload: payload
      };
    case CATALOG.EDIT_PRODUCT:
      return {
        type: action,
        payload: payload
      };
    case CATALOG.REMOVE_PRODUCT:
      return {
        type: action,
        payload: payload
      };
    case CATALOG.ADD_CATEGORY:
      return {
        type: action,
        payload: payload
      };
    case CATALOG.ON_FILE_LOADED:
      return {
        type: action,
        payload: payload
      };
    case CATALOG.ADD_COLOR:
      return {
        type: action,
        payload: payload
      };
    case CATALOG.EDIT_COLOR:
      return {
        type: action,
        payload: payload
      };
    case CATALOG.REMOVE_COLOR:
      return {
        type: action,
        payload: payload
      };
    case CATALOG.ON_FILE_SAVED:
      return {
        type: action,
        payload: payload
      };
    case CATALOG.ON_FILE_CLEAR:
      return {
        type: action,
        payload: payload
      };
    case CATALOG.ATC_MODAL_OPEN:
      return {
        type: action,
        payload: payload
      };
    default:
      return;
  }
}

export default CatalogActions;
