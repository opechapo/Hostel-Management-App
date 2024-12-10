import React,{useContext} from "react";
// import { Outlet } from "react-router-dom";
import { UserContext } from "./userContext";
import {Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { user } = useContext(UserContext);

  const content = user ? <Outlet /> : <Navigate to={"/login"} replace />;

  return content;
};

export default RequireAuth;
