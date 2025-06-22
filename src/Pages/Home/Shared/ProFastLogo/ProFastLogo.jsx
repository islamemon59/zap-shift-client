import React from "react";
import logo from "../../../../assets/logo.png";
import { Link } from "react-router";

const ProFastLogo = () => {
  return (
    <Link to="/">
      <div className="flex justify-center items-center">
        <img className="mb-4" src={logo} alt="logo" />
        <p className="text-3xl -ml-3 font-extrabold">Profast</p>
      </div>
    </Link>
  );
};

export default ProFastLogo;
