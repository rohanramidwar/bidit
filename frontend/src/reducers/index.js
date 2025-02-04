import { combineReducers } from "redux";
import authReducer from "./authReducer";
import auctionReducer from "./auctionReducer";
import bidsReducer from "./bidReducer";

export default combineReducers({ authReducer, auctionReducer, bidsReducer });
