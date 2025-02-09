import {
  BIDS_LOADING,
  END_BIDS_LOADING,
  GET_BIDS,
  PLACE_BID,
} from "../constants/actionTypes";

const initialState = {
  bidsLoading: false,
  btnLoading: false,
  bids: [],
  error: null,
};

const bidsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case BIDS_LOADING:
      return {
        ...state,
        bidsLoading: true,
        error: null,
      };

    case END_BIDS_LOADING:
      return {
        ...state,
        bidsLoading: false,
        error: null,
      };

    case GET_BIDS:
      return {
        ...state,
        bids: payload,
        error: null,
      };

    case PLACE_BID:
      return { ...state, bids: [payload, ...state?.bids], error: null };

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
