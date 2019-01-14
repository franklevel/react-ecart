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

      /* const filteredCart = state.cart
        .filter(item => {
          return item.id !== payload.id;
        })
        .concat({ ...payload, quantity: payload.quantity + 1 }); */

      return {
        ...state,
        cart:
          hasKey === -1
            ? state.cart.concat(payload)
            : [
                ...state.cart,
                (state.cart[hasKey] = {
                  ...payload,
                  quantity: payload.quantity + 1
                })
              ]
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
