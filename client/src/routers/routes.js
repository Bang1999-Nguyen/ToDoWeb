import SignIn from "../components/Auth/SignIn/SignIn";
import DashBoard from "../components/Dashboard/DashBoard";

export const RoutesList = [
  {
    path: "/",
    element: <DashBoard />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
];
