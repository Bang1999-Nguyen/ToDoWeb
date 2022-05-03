import {
  CREATE_TO_DO_LIST,
  GET_TO_DO_LIST,
} from "../../actions/ToDoAction/ToDoAction";

// eslint-disable-next-line no-unused-vars
export const initialState = {
  toDoList: {},
};

export const ToDoReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TO_DO_LIST:
      return { ...state, toDoList: payload };
    case CREATE_TO_DO_LIST:
      return { ...state, payload };
    default:
      return state;
  }
};
