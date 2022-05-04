import React, { createContext, useReducer } from "react";
import {
  GET_USER,
  SIGN_IN,
  SIGN_UP,
} from "../../actions/UserAction/UserAction";
import { UserReducer } from "../../reducers/UserReducer/UserReducer";
import UserService from "../../services/Users/user.services";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(UserReducer, []);

  const handleSignIn = (user) => {
    return UserService.signIn(user)
      .then((res) => {
        dispatch({
          type: SIGN_IN,
          payload: res.data.post,
        });
        return res;
      })
      .catch((error) => {
        return error;
      });
  };

  const handleSignUp = (user) => {
    return UserService.signUp(user)
      .then((res) => {
        dispatch({
          type: SIGN_UP,
          payload: res,
        });
        return res;
      })
      .catch((error) => {
        return error;
      });
  };

  const getUserProfile = (token) => {
    return UserService.getUserProfile(token)
      .then((res) => {
        dispatch({
          type: GET_USER,
          payload: res,
        });
        return res;
      })
      .catch((error) => {
        return error;
      });
  };

  const userData = {
    user,
    dispatch,
    handleSignIn,
    handleSignUp,
    getUserProfile,
  };
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};
