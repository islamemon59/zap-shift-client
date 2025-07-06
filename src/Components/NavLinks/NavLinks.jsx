import React from "react";
import { NavLink } from "react-router";
import AuthHook from "../../Hooks/AuthHook/AuthHook";
const NavLinks = () => {
  const { user, loading } = AuthHook();
  return (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive && "bg-secondary rounded-3xl"
            } font-semibold rounded-3xl`
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive && "bg-secondary rounded-3xl"
            } font-semibold rounded-3xl`
          }
          to="/coverage"
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive && "bg-secondary rounded-3xl"
            } font-semibold rounded-3xl`
          }
          to="/sendParcel"
        >
          Send Parcel
        </NavLink>
      </li>

      {user && !loading && (
        <>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive && "bg-secondary rounded-3xl"
                } font-semibold rounded-3xl`
              }
              to="/beARiderLandingPage"
            >
              Be a Rider
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive && "bg-secondary rounded-3xl"
                } font-semibold rounded-3xl`
              }
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive && "bg-secondary rounded-3xl"
            } font-semibold rounded-3xl`
          }
          to="/aboutUs/story"
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive && "bg-secondary rounded-3xl"
            } font-semibold rounded-3xl`
          }
          to="/pricing"
        >
          Pricing
        </NavLink>
      </li>
    </>
  );
};

export default NavLinks;
