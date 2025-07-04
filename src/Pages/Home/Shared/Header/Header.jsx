import React from "react";
import { Link, NavLink } from "react-router";
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import AuthHook from "../../../../Hooks/AuthHook/AuthHook";
import Loader from "../Loader/Loader";

const Header = () => {
  const { user, signOutUser, loading } = AuthHook();
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel">Send Parcel</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/beARiderLandingPage">Be a Rider</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink to="/aboutUs/story">About Us</NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    signOutUser()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="shadow-sm py-2 sticky top-0 z-50 bg-base-100/70 backdrop-blur-md flex items-center">
      <div className="navbar max-w-7xl mx-auto h-full">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden px-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="btn btn-ghost text-xl">
            <ProFastLogo />
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button
              className="btn btn-outline btn-secondary text-primary-content"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-secondary text-primary-content"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
