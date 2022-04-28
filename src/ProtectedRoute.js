import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const userAuth = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  //   console.log(LogedinData);
  if (token) {
    return true;
  } else {
    return false;
  }
};

function ProtectedRoute() {
  //   userAuth();
  const auth = userAuth();
  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
