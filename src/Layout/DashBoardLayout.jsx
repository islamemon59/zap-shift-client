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

const DashBoardLayout = () => {
  const { role, isLoading } = useUserRole();

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

          {!isLoading && role === "user" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/myParcel"
                  className="flex items-center gap-2"
                >
                  <FiPackage /> My Parcel
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className="flex items-center gap-2"
                >
                  <FiCreditCard /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/trackParcel"
                  className="flex items-center gap-2"
                >
                  <FiMapPin /> Track a Parcel
                </NavLink>
              </li>
            </>
          )}

          {!isLoading && role === "rider" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/pendingDeliveries"
                  className="flex items-center gap-2"
                >
                  <FiPackage /> Pending Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/completedDeliveries"
                  className="flex items-center gap-2"
                >
                  <FiCheckCircle /> Completed Deliveries
                </NavLink>
              </li>
            </>
          )}

          {!isLoading && role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/assign-rider"
                  className="flex items-center gap-2"
                >
                  <FiUserCheck /> Assign Rider
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/pendingRiders"
                  className="flex items-center gap-2"
                >
                  <FiUsers /> Pending Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/activeRiders"
                  className="flex items-center gap-2"
                >
                  <FiCheckCircle /> Active Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/makeAdmin"
                  className="flex items-center gap-2"
                >
                  <FiUserPlus /> Make Admin
                </NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink
              to="/dashboard/updateProfile"
              className="flex items-center gap-2"
            >
              <FiEdit /> Update Profile
            </NavLink>
          </li>
        </aside>
      </div>
    </div>
  );
};

export default DashBoardLayout;
