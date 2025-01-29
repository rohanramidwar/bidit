import {
  START_LOADING,
  END_LOADING,
  CREATE_AUCTION,
} from "../constants/actionTypes";

const initialState = {
  isLoading: false,
  auctions: [],
  error: null,
};

const auctionReducer = (state = initialState, action) => {
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

    case CREATE_AUCTION:
      return {
        ...state,
        auctions: [...state.auctions, action.payload],
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

export default auctionReducer;
