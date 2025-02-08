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
    dispatch({ type: START_LOADING });
    const { data } = await api.registerToBid(id, userData);
    dispatch({ type: UPDATE_AUCTION, payload: data });
    dispatch({ type: END_LOADING });
    toast.success("Successfully registered");
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Failed to register");
    dispatch({ type: END_LOADING });
  }
};

export const placeBid = (id, userData, socket) => async (dispatch) => {
  try {
    dispatch({ type: BIDS_LOADING });
    const {
      data: { bid, auction },
    } = await api.placeBid(id, userData);

    socket?.emit("new_bid", {
      bid,
      auction,
    });

    // dispatch({ type: PLACE_BID, payload: bid });

    // dispatch({ type: UPDATE_AUCTION, payload: auction });

    toast.success("Bid placed successfully");
    dispatch({ type: END_BIDS_LOADING });
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
