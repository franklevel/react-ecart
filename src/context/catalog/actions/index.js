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
