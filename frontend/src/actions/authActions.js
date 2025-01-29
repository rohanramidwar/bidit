import * as api from "../api";
import {
  END_LOADING,
  LOGIN,
  SIGN_UP,
  START_LOADING,
} from "@/constants/actionTypes";

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.signup(formData);
    dispatch({ type: SIGN_UP, payload: data }); //sends to reducer
    dispatch({ type: END_LOADING });
    navigate("/");
  } catch (err) {
    console.log(err);
    dispatch({ type: END_LOADING });
  }
};

export const login = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.login(formData);
    dispatch({ type: LOGIN, payload: data }); //sends to reducer
    dispatch({ type: END_LOADING });
    navigate("/");
  } catch (err) {
    console.log(err);
    dispatch({ type: END_LOADING });
  }
};
