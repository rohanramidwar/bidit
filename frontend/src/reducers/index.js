import { combineReducers } from "redux";
import authReducer from "./authReducer";
import auctionReducer from "./auctionReducer";
import bidsReducer from "./bidReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  authReducer,
  auctionReducer,
  bidsReducer,
  cartReducer,
});
