import toast from "react-hot-toast";
import * as api from "../api";
import {
  END_LOADING,
  GET_ACTIVE_AUCTIONS,
  GET_ENDED_AUCTIONS,
  START_LOADING,
  GET_AUCTION,
  GET_BIDS,
  UPDATE_AUCTION,
  PLACE_BID,
  END_BIDS_LOADING,
  BIDS_LOADING,
} from "@/constants/actionTypes";
import { data } from "react-router-dom";

export const fetchAuctionById = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getAuctionById(id);
    dispatch({ type: GET_AUCTION, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Failed to fetch auction");
    dispatch({ type: END_LOADING });
  }
};

export const fetchBidsByItem = (itemId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getBidsByItem(itemId);
    dispatch({ type: GET_BIDS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Failed to fetch bids");
    dispatch({ type: END_LOADING });
  }
};

export const registerToBid = (id, userData) => async (dispatch) => {
  try {
    const { data } = await api.registerToBid(id, userData);
    dispatch({ type: UPDATE_AUCTION, payload: data });

    toast.success("Successfully registered");
    return data;
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Failed to register");
  }
};

export const placeBid = (id, userData, socket) => async (dispatch) => {
  try {
    const {
      data: { bid, auction },
    } = await api.placeBid(id, userData);

    socket?.emit("new_bid", {
      bid,
      auction,
    });

    toast.success("Bid placed successfully");
    return data;
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Failed to place bid");
  }
};

export const getActiveAuctions = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getActiveAuctions();
    dispatch({ type: GET_ACTIVE_AUCTIONS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Failed to fetch active auctions");
    dispatch({ type: END_LOADING });
  }
};

export const getEndedAuctions = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getEndedAuctions();
    dispatch({ type: GET_ENDED_AUCTIONS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Failed to fetch ended auctions");
    dispatch({ type: END_LOADING });
  }
};
