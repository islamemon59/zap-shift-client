import React from "react";
import { Outlet } from "react-router";
import Header from "../Pages/Home/Shared/Header/Header";
import Footer from "../Pages/Home/Shared/Footer/Footer";
import Banner from "../Pages/Banner/Banner";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
