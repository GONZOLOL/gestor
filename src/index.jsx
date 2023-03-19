import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.scss";
import { SignUp } from "./components/SignUp";
import { LogIn } from "./components/LogIn";
import { Users } from "./components/Users";
import { LogOut } from "./components/LogOut";
import { ViewUser } from "./components/ViewUser";
import { EditUser } from "./components/EditUser";
import { Delete } from "./components/Delete";
import App from "./components/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/logIn",
    element: <LogIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/users/viewUser",
    element: <ViewUser />,
  },
  {
    path: "/users/logOut",
    element: <LogOut />,
  },
  {
    path: "/users/editUser",
    element: <EditUser />,
  },
  {
    path: "/users/delete",
    element: <Delete />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
