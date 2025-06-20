import React from "react";
import authImage from "../../assets/authImage.png";
import { Outlet } from "react-router";
import ProFastLogo from "../../Pages/Home/Shared/ProFastLogo/ProFastLogo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-start gap-4 overflow-y-hidden">
      <div className="p-8">
        <ProFastLogo />
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse w-full p-0">
        <div className="flex-1 bg-accent hidden lg:flex justify-center items-center md:min-h-screen">
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
