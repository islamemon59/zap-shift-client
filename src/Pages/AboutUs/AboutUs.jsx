import React from "react";
import Story from "./Story/Story";
import { NavLink, Outlet } from "react-router";

const AboutUs = () => {
  return (
    <div className="mx-auto p-4 md:p-26 bg-base-100 rounded-xl shadow space-y-12">
      <div>
        <h2 className="md:text-[56px] text-4xl font-bold mb-2 text-gray-800">
          About Us
        </h2>
        <p className=" text-gray-600 mb-6 max-w-2xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div className="divider"></div>

      <div className="mt-10">
        <nav className="flex gap-6">
          <NavLink
            to="/aboutUs/story"
            className={({ isActive }) =>
              `${isActive && "font-semibold"} relative text-primary group`
            }
          >
            <span>Story</span>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
          </NavLink>
          <NavLink
            to="/aboutUs/mission"
            className={({ isActive }) =>
              `${isActive && "font-semibold"} relative text-primary group`
            }
          >
            <span>Mission</span>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
          </NavLink>
          <NavLink
            to="/aboutUs/success"
            className={({ isActive }) =>
              `${isActive && "font-semibold"} relative text-primary group`
            }
          >
            <span>Success</span>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
          </NavLink>
          <NavLink
            to="/aboutUs/team"
            className={({ isActive }) =>
              `${isActive && "font-semibold"} relative text-primary group`
            }
          >
            <span>Team & Others</span>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
          </NavLink>
        </nav>
      </div>

      <div>
        <Outlet />
      </div>

      {/* <Story /> */}
    </div>
  );
};

export default AboutUs;
