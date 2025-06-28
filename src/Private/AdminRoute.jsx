import React from "react";
import AuthHook from "../Hooks/AuthHook/AuthHook";
import useUserRole from "../Hooks/useUserRole/useUserRole";
import Loader from "../Pages/Home/Shared/Loader/Loader";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = AuthHook();
  const { role, isLoading } = useUserRole();
  const location = useLocation();
  const from = location?.pathname;

  if (loading || isLoading) {
    return <Loader />;
  }

  if (!user || role !== "admin") {
    return <Navigate to="/forbidden" state={from}></Navigate>;
  }

  return children
};

export default AdminRoute;
