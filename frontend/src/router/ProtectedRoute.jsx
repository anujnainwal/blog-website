import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  let location = useLocation();
  let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  return isLoggedIn === true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ form: location }} replace />
  );
};

export default ProtectedRoute;
