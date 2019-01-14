import { combineReducers } from "redux";
import catalogReducer from "../../context/catalog/reducers";
import cartReducer from "../../context/cart/reducers";

const rootReducer = combineReducers({ catalogReducer, cartReducer });

export default rootReducer;
