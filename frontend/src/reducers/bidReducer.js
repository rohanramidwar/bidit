import { START_LOADING, END_LOADING, GET_BIDS } from "../constants/actionTypes";

const initialState = {
  bidsLoading: false,
  bids: [],
  error: null,
};

const bidsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case START_LOADING:
      return {
        ...state,
        bidsLoading: true,
        error: null,
      };

    case END_LOADING:
      return {
        ...state,
        bidsLoading: false,
      };

    case GET_BIDS:
      return {
        ...state,
        bids: payload,
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default bidsReducer;
