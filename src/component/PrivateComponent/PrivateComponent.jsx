import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateComponent = () => {
  const auth = localStorage.getItem("user");
  // if user present in localstorage then we simpled loged in
  return auth ? <Outlet /> : <Navigate to="signup" />;
};

export default PrivateComponent;
