import toast from "react-hot-toast";
import * as api from "../api";
import {
  CREATE_AUCTION,
  END_LOADING,
  START_LOADING,
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
