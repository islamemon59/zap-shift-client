import React from "react";
import {
  FiCheckCircle,
  FiUserCheck,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";
import { NavLink } from "react-router";

const AdminLinks = () => {
  return (
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
        <NavLink to="/dashboard/makeAdmin" className="flex items-center gap-2">
          <FiUserPlus /> Make Admin
        </NavLink>
      </li>
    </>
  );
};

export default AdminLinks;
