import React from "react";
import authImage from "../assets/authImage.png";
import { Outlet } from "react-router";
import ProFastLogo from "../Pages/Home/Shared/ProFastLogo/ProFastLogo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col items-start overflow-y-hidden">
      <div className="max-w-2xl pt-6 pl-6">
        <ProFastLogo />
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse w-full lg:bg-accent rounded-2xl p-0">
        <div className="flex-1 hidden lg:flex justify-center items-center md:h-[750px]">
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
