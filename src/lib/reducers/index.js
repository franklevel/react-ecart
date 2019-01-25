import { combineReducers } from "redux";
import catalogReducer from "../../context/catalog/reducers";
import cartReducer from "../../context/cart/reducers";
import userReducer from "../../context/user/reducers";

const rootReducer = combineReducers({
  catalogReducer,
  cartReducer,
  userReducer
});

export default rootReducer;
