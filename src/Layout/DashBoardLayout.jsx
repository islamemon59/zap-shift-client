import React from "react";
import { NavLink, Outlet } from "react-router";
import ProFastLogo from "../Pages/Home/Shared/ProFastLogo/ProFastLogo";
import useUserRole from "../Hooks/useUserRole/useUserRole";
import {
  FiHome,
  FiPackage,
  FiCreditCard,
  FiMapPin,
  FiUserCheck,
  FiCheckCircle,
  FiUsers,
  FiUserPlus,
  FiEdit,
} from "react-icons/fi";
import Loader from "../Pages/Home/Shared/Loader/Loader";
import UserLinks from "../Components/DashboardLinks/UserLinks/UserLinks";
import RiderLinks from "../Components/DashboardLinks/RiderLinks/RiderLinks";
import AdminLinks from "../Components/DashboardLinks/AdminLinks/AdminLinks";

const DashBoardLayout = () => {
  const { role, isLoading } = useUserRole();

  if(isLoading){
    return <Loader/>
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="navbar bg-base-300 w-full  lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <ProFastLogo />

          <li>
            <NavLink to="/" className="flex items-center gap-2">
              <FiHome /> Home
            </NavLink>
          </li>

          {!isLoading && role === "user" && 
            <UserLinks/>
          }

          {!isLoading && role === "rider" && <RiderLinks/>}

          {!isLoading && role === "admin" && <AdminLinks/>}

          <li>
            <NavLink
              to="/dashboard/profile"
              className="flex items-center gap-2"
            >
              <FiEdit />Profile
            </NavLink>
          </li>
        </aside>
      </div>
    </div>
  );
};

export default DashBoardLayout;
