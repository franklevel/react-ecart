import CART from "../constants";

export function CartActions(action, payload) {
  switch (action) {
    case CART.ADD_PRODUCT:
      return {
        type: action,
        payload: payload
      };
    case CART.EDIT_PRODUCT:
      return {
        type: action,
        payload: payload
      };
    case CART.REMOVE_PRODUCT:
      return {
        type: action,
        payload: payload
      };
    default:
      return;
  }
}

export default CartActions;
