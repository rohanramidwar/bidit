import {
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_FROM_CART,
} from "@/constants/actionTypes";
import toast from "react-hot-toast";
import * as api from "../api";

export const addToCart = (itemId, userId) => async (dispatch) => {
  try {
    const { data } = await api.addToCart(itemId, userId);

    dispatch({
      type: ADD_TO_CART,
      payload: data,
    });

    toast.success("Item added to cart");
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to add item");
  }
};

export const removeFromCart = (itemId, userId) => async (dispatch) => {
  try {
    await api.removeFromCart(itemId, userId);

    dispatch({
      type: REMOVE_FROM_CART,
      payload: itemId,
    });

    toast.success("Item removed from cart");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to remove item");
  }
};

export const getCartItems = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getCartItems(userId);

    dispatch({
      type: GET_CART_ITEMS,
      payload: data,
    });
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch cart items");
  }
};
