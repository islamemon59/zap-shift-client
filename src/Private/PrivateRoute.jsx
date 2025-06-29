import React from "react";
import AuthHook from "../Hooks/AuthHook/AuthHook";
import Loader from "../Pages/Home/Shared/Loader/Loader";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = AuthHook();
  const location = useLocation();
  const from = location?.pathname;

  if (loading) {
    return <Loader></Loader>;
  }

  if (!user) {
    return <Navigate to="/login" state={from}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
