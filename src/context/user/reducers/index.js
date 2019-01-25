import USER from "../constants";
import data from "../../../lib/mockData";
import jwt from "jsonwebtoken";
import APP from "../../../lib/constants";

const initialState = {
  currentUser: null,
  users: []
};

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER.ADD_USER:
      return {
        ...state,
        users: [...state.users, payload]
      };
    case USER.EDIT_USER:
      return [...state.catalog, payload];

    case USER.REMOVE_USER:
      return {
        users: state.users.filter(item => {
          return item.id !== payload.id;
        })
      };
    case USER.LOGIN_USER:
      return {
        ...state,
        currentUser: doLogin(payload)
      };
    case USER.LOGOUT_USER:
      return {
        ...state,
        currentUser: null
      };
    default:
      return state;
  }
}

function doLogin(payload) {
  const user = data.users.find(u => {
    return u.username === payload.username;
  });

  if (user !== "undefined" && user.password === payload.password) {
    return {
      user: user.username,
      token: jwt.sign(user, APP.SECRET_KEY)
    };
  } else {
    return null;
  }
}

export default userReducer;
