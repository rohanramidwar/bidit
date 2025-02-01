import toast from "react-hot-toast";
import * as api from "../api";
import {
  END_LOADING,
  LOGIN,
  LOGOUT,
  SIGN_UP,
  START_LOADING,
} from "@/constants/actionTypes";

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.signup(formData);
    dispatch({ type: SIGN_UP, payload: data }); //sends to reducer
    dispatch({ type: END_LOADING });
    toast.success("Successfully signed up!");
    navigate(data.user.role === "seller" ? "/dashboard" : "/");
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Something went wrong");
    dispatch({ type: END_LOADING });
  }
};

export const login = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.login(formData);
    dispatch({ type: LOGIN, payload: data }); //sends to reducer
    dispatch({ type: END_LOADING });
    toast.success("Successfully logged in!");
    navigate(data.user.role === "seller" ? "/dashboard" : "/");
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Invalid credentials");
    dispatch({ type: END_LOADING });
  }
};

export const logOut = (navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT }); //sends to reducer
    toast.success("Successfully logged out!");
    navigate("/login");
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.error || "Something went wrong");
  }
};
