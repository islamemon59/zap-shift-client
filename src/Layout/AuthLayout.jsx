import React from "react";
import authImage from "../assets/authImage.png";
import { Outlet } from "react-router";
import ProFastLogo from "../Pages/Home/Shared/ProFastLogo/ProFastLogo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col items-start overflow-y-hidden max-w-7xl mx-auto">
      <div className="max-w-2xl pt-6 pl-6">
        <ProFastLogo />
      </div>
      <div className="hero-content flex-col md:flex-row-reverse w-full md:bg-accent rounded-2xl">
        <div className="flex-1 hidden md:flex justify-center items-center md:h-[750px]">
          <img src={authImage} className="max-w-sm rounded-lg shadow-2xl" />
        </div>
        <div className="flex-1 w-full justify-items-center">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
