import { combineReducers } from "redux";
import authReducer from "./authReducer";
import auctionReducer from "./auctionReducer";

export default combineReducers({ authReducer, auctionReducer });
