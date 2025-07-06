import React from "react";
import { FiCreditCard, FiMapPin, FiPackage } from "react-icons/fi";
import { NavLink } from "react-router";

const UserLinks = () => {
  return (
    <>
      <li>
        <NavLink to="/dashboard/myParcel" className="flex items-center gap-2">
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
  );
};

export default UserLinks;
