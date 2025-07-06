import React from "react";
import useUserRole from "../../../Hooks/useUserRole/useUserRole";
import Loader from "../../Home/Shared/Loader/Loader";
import UserDashboard from "./UserDashboard";
import RiderDashboard from "./RiderDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardHome = () => {
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return <Loader />;
  }

  if (role === "user") {
    return <UserDashboard />;
  } else if (role === "rider") {
    return <RiderDashboard />;
  } else if (role === "admin") {
    return <AdminDashboard />;
  }
};

export default DashboardHome;
