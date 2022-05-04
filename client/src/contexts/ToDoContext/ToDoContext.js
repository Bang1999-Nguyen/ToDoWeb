import React, { createContext, useReducer } from "react";
import {
  CREATE_TO_DO_LIST,
  GET_TO_DO_LIST,
} from "../../actions/ToDoAction/ToDoAction";
import { ToDoReducer } from "../../reducers/ToDoReducer/ToDoReducer";
import todoService from "../../services/ToDo/todo.service";

export const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
  const [toDo, dispatch] = useReducer(ToDoReducer, []);

  const getToDoList = (accessToken) => {
    return todoService
      .getToDoList(accessToken)
      .then((res) => {
        dispatch({
          type: GET_TO_DO_LIST,
          payload: res.data.posts,
        });
        return res.data.posts;
      })
      .catch((error) => {
        return error;
      });
  };

  const createToDoList = (todo, accessToken) => {
    return todoService
      .createToDo(todo, accessToken)
      .then((res) => {
        dispatch({
          type: CREATE_TO_DO_LIST,
          payload: res.data.post,
        });
        return res;
      })
      .catch((error) => {
        return error;
      });
  };

  const updateToDoList = (id, todo, token) => {
    return todoService
      .updateToDo(id, todo, token)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  };
  const deleteToDoList = (id, token) => {
    return todoService
      .deleteToDo(id, token)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  };

  const toDoData = {
    toDo,
    dispatch,
    getToDoList,
    createToDoList,
    updateToDoList,
    deleteToDoList,
  };
  return (
    <ToDoContext.Provider value={toDoData}>{children}</ToDoContext.Provider>
  );
};
