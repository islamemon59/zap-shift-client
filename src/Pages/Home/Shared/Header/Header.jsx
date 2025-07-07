import React from "react";
import { Link, NavLink } from "react-router";
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import AuthHook from "../../../../Hooks/AuthHook/AuthHook";
import Loader from "../Loader/Loader";
import NavLinks from "../../../../Components/NavLinks/NavLinks";

const Header = () => {
  const { user, signOutUser, loading } = AuthHook();

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
    <div className="shadow-sm py-2 sticky top-0 z-50 bg-base-100/70 backdrop-blur-md flex justify-center">
      <div className="navbar max-w-7xl mx-auto h-full flex items-center py-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden px-2"
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
              <NavLinks />
            </ul>
          </div>
          <div className="text-xl">
            <ProFastLogo />
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex justify-center items-center gap-2">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full border-2 border-secondary">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL}
                    />
                  </div>
                </div>
              </div>
              <button
                className="btn btn-outline btn-secondary text-primary-content"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/register"
                className="btn md:btn-md btn-sm btn-secondary btn-outline text-primary-content rounded-xl"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="btn md:btn-md btn-sm btn-secondary text-primary-content rounded-xl"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
