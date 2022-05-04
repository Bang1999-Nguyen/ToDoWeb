import React from "react";
import { UserProvider } from "../../../contexts/UserContext/UserContext";
import SignIn from "./SignIn";

const SignInContainer = () => {
  return (
    <UserProvider>
      <SignIn />
    </UserProvider>
  );
};

export default SignInContainer;
