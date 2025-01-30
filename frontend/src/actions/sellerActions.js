import toast from "react-hot-toast";
import * as api from "../api";
import {
  CREATE_AUCTION,
  END_LOADING,
  GET_MY_AUCTIONS,
  START_LOADING,
  UPDATE_AUCTION,
} from "@/constants/actionTypes";

export const createAuction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createAuction(formData);
    dispatch({ type: CREATE_AUCTION, payload: data }); //sends to reducer
    dispatch({ type: END_LOADING });
    toast.success("Auction created!");
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Something went wrong");
    dispatch({ type: END_LOADING });
  }
};

export const getMyAuctions = (userId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getMyAuctions(userId);
    dispatch({ type: GET_MY_AUCTIONS, payload: data }); //sends to reducer
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Something went wrong");
    dispatch({ type: END_LOADING });
  }
};

export const stopAuction = (auctionId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.stopAuction(auctionId);
    dispatch({ type: UPDATE_AUCTION, payload: data }); //sends to reducer
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Something went wrong");
    dispatch({ type: END_LOADING });
  }
};
