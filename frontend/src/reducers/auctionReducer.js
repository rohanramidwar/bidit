import {
  START_LOADING,
  END_LOADING,
  CREATE_AUCTION,
  GET_MY_ACTIVE_AUCTIONS,
  GET_MY_ENDED_AUCTIONS,
  END_AUCTION,
  DELETE_AUCTION,
} from "../constants/actionTypes";

const initialState = {
  isLoading: false,
  activeAuctions: [],
  endedAuctions: [],
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
        activeAuctions: [payload, ...state.activeAuctions],
        error: null,
      };

    case GET_MY_ACTIVE_AUCTIONS:
      return {
        ...state,
        activeAuctions: payload,
        error: null,
      };

    case GET_MY_ENDED_AUCTIONS:
      return {
        ...state,
        endedAuctions: payload,
        error: null,
      };

    case END_AUCTION:
      if (payload.endDate) {
        return {
          ...state,

          activeAuctions: state.activeAuctions.filter(
            (auction) => auction._id !== payload._id
          ),

          endedAuctions: state.endedAuctions.some(
            (auction) => auction._id === payload._id
          )
            ? state.endedAuctions.map((auction) =>
                auction._id === payload._id ? payload : auction
              )
            : [payload, ...state.endedAuctions],
          error: null,
        };
      }

    case DELETE_AUCTION:
      return {
        ...state,
        activeAuctions: state.activeAuctions.filter(
          (auction) => auction._id !== payload
        ),
        endedAuctions: state.endedAuctions.filter(
          (auction) => auction._id !== payload
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
