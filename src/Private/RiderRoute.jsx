import React from "react";
import AuthHook from "../Hooks/AuthHook/AuthHook";
import useUserRole from "../Hooks/useUserRole/useUserRole";
import { useLocation } from "react-router";
import Loader from "../Pages/Home/Shared/Loader/Loader";

const RiderRoute = ({ children }) => {
  const { user, loading } = AuthHook();
  const { role, isLoading } = useUserRole();
  const location = useLocation();
  const from = location?.pathname;

  if (loading || isLoading) {
    return <Loader />;
  }

  if (!user || role !== "rider") {
    return <Navigate to="/forbidden" state={from}></Navigate>;
  }

  return children;
};

export default RiderRoute;
