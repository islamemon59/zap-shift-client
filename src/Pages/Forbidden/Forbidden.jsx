import React from "react";
import { useNavigate } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="bg-white rounded-full shadow-lg p-6 mb-6">
        <FaLock className="text-red-500 text-6xl" />
      </div>
      <h1 className="text-6xl font-bold text-red-500 mb-2">403</h1>
      <h2 className="text-2xl font-semibold mb-4">Access Forbidden</h2>
      <p className="max-w-md text-gray-500 mb-6">
        Sorry, you don’t have permission to access this page. If you think this
        is a mistake, please contact the administrator.
      </p>
      <button onClick={() => navigate("/")} className="btn btn-secondary text-primary">
        Go Back Home
      </button>
    </div>
  );
};

export default Forbidden;
