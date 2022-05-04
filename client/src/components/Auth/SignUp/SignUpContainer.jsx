import React from "react";
import { UserProvider } from "../../../contexts/UserContext/UserContext";
import { SignUp } from "./SignUp";

const SignUpContainer = () => {
  return (
    <>
      <UserProvider>
        <SignUp />
      </UserProvider>
    </>
  );
};

export default SignUpContainer;
