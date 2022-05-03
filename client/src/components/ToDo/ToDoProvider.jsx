import React from "react";
import { ToDoProvider } from "../../contexts/ToDoContext/ToDoContext";
import ToDo from "./ToDo";

const ToDoContainer = () => {
  return (
    <>
      <ToDoProvider>
        <ToDo></ToDo>
      </ToDoProvider>
    </>
  );
};

export default ToDoContainer;
