import React from "react";
import { Outlet, Navigate } from "react-router-dom";

// Private route to restrict user
const PrivateRoute = () => {
  let token = localStorage.getItem("accessToken") == null ? false : true;
  return <>{token ? <Outlet /> : <Navigate to="/login" />}</>;
};
export default PrivateRoute;
