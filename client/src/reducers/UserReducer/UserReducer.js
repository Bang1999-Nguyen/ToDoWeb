import {
  GET_USER,
  SIGN_IN,
  SIGN_UP,
} from "../../actions/UserAction/UserAction";

// eslint-disable-next-line no-unused-vars
export const initialState = {
  user: {},
};

export const UserReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN: {
      return state;
    }
    case SIGN_UP: {
      return state;
    }
    case GET_USER: {
      return state;
    }
    default:
      return state;
  }
};
