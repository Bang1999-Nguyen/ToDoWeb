import React from "react";

const DashBoard = React.lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 2 * 1000)).then(() =>
    import("../components/Dashboard/DashBoard")
  );
});
const ToDoContainer = React.lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 2 * 1000)).then(() =>
    import("../components/ToDo/ToDoProvider")
  );
});
export const RoutesList = [
  {
    path: "/",
    element: <DashBoard />,
  },
  {
    path: "/todo",
    element: <ToDoContainer />,
  },
];
