import {
  START_LOADING,
  END_LOADING,
  SIGN_UP,
  LOGIN,
  LOGOUT,
} from "../constants/actionTypes";

const initialState = {
  isLoading: false,
  user: null,
  token: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case SIGN_UP:
    case LOGIN:
      localStorage.setItem("profile", JSON.stringify(payload));
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        error: null,
      };

    case LOGOUT:
      localStorage.removeItem("profile");
      return {
        ...state,
        user: null,
        token: null,
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
