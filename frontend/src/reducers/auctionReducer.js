import {
  START_LOADING,
  END_LOADING,
  CREATE_AUCTION,
  GET_MY_AUCTIONS,
  UPDATE_AUCTION,
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
        auctions: [...state.auctions, payload],
        error: null,
      };

    case GET_MY_AUCTIONS:
      return {
        ...state,
        auctions: payload,
        error: null,
      };

    case UPDATE_AUCTION:
      return {
        ...state,
        auctions: state.auctions.map((auction) =>
          auction._id === payload._id ? payload : auction
        ),
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
