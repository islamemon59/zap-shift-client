import React from "react";
import { FiCheckCircle, FiPackage } from "react-icons/fi";
import { NavLink } from "react-router";

const RiderLinks = () => {
  return (
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
      <li>
        <NavLink to="/dashboard/myEarnings" className="flex items-center gap-2">
          <FiCheckCircle /> My Earnings
        </NavLink>
      </li>
    </>
  );
};

export default RiderLinks;
