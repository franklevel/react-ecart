import USER from "../constants";

export function UserActions(action, payload) {
  switch (action) {
    case USER.ADD_USER:
      return {
        type: USER.ADD_USER,
        payload: payload
      };
    case USER.EDIT_USER:
      return {
        type: USER.EDIT_USER,
        payload: payload
      };
    case USER.REMOVE_USER:
      return {
        type: USER.REMOVE_USER,
        payload: payload
      };
    case USER.LOGIN_USER:
      return {
        type: USER.LOGIN_USER,
        payload: payload
      };
    case USER.LOGOUT_USER:
      return {
        type: USER.LOGOUT_USER
      };
    default:
      return;
  }
}

export default UserActions;
