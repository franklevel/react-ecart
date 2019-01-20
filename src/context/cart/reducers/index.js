import CART from "../constants/";

const initialState = {
  cart: []
};

export function cartReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CART.ADD_PRODUCT:
      // Check whether product exists
      const hasKey = state.cart.findIndex(item => {
        return item.id === payload.id;
      });

      return {
        ...state,
        cart:
          hasKey === -1 ? state.cart.concat(payload) : [...state.cart, payload]
      };

    case CART.REMOVE_PRODUCT:
      return {
        ...state,
        cart: payload
      };
    default:
      return state;
  }
}

export default cartReducer;
