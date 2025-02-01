import toast from "react-hot-toast";
import * as api from "../api";
import {
  CREATE_AUCTION,
  DELETE_AUCTION,
  END_LOADING,
  GET_MY_ACTIVE_AUCTIONS,
  GET_MY_AUCTIONS,
  GET_MY_ENDED_AUCTIONS,
  START_LOADING,
  UPDATE_AUCTION,
} from "@/constants/actionTypes";

export const createAuction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createAuction(formData);
    dispatch({ type: CREATE_AUCTION, payload: data }); //sends to reducer
    dispatch({ type: END_LOADING });
    toast.success("Auction created successfully!");
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Something went wrong");
    dispatch({ type: END_LOADING });
  }
};

export const getMyActiveAuctions = (userId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getMyActiveAuctions(userId);
    dispatch({ type: GET_MY_ACTIVE_AUCTIONS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Failed to fetch active auctions");
    dispatch({ type: END_LOADING });
  }
};

export const getMyEndedAuctions = (userId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getMyEndedAuctions(userId);
    dispatch({ type: GET_MY_ENDED_AUCTIONS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Failed to fetch ended auctions");
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

export const deleteAuction = (auctionId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await api.deleteAuction(auctionId);
    dispatch({ type: DELETE_AUCTION, payload: auctionId });
    dispatch({ type: END_LOADING });
    toast.success("Auction deleted successfully!");
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.message || "Something went wrong");
    dispatch({ type: END_LOADING });
  }
};
