import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  GET_CART_ITEMS,
} from "../constants/actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: payload,
        error: null,
      };

    case REMOVE_FROM_CART:
      const updatedItems = state.items.filter((item) => item._id !== payload);
      return {
        ...state,
        items: updatedItems,
        error: null,
      };

    case GET_CART_ITEMS:
      return {
        ...state,
        items: payload,
        error: null,
      };

    default:
      return state;
  }
};

export default cartReducer;
