import toast from "react-hot-toast";
import * as api from "../api";
import {
  END_LOADING,
  GET_ACTIVE_AUCTIONS,
  GET_ENDED_AUCTIONS,
  START_LOADING,
  GET_AUCTION,
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
