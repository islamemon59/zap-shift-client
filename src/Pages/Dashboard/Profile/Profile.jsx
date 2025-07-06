import React from "react";
import AuthHook from "../../../Hooks/AuthHook/AuthHook";
import { Link } from "react-router";

const Profile = () => {
  const { user } = AuthHook();

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col justify-center min-h-screen">
      <div className="border-1 border-secondary/70 rounded-lg shadow-md py-4">
        <h2 className="text-3xl font-bold mb-6 text-primary border-b pb-3 text-center">
          My Profile
        </h2>

        <div className="card bg-base-100">
          <div className="card-body flex flex-col md:flex-row items-center gap-6">
            {/* Profile photo */}
            <div className="flex-shrink-0">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/2FsfXqM/default-avatar.png"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border border-gray-300 shadow"
              />
            </div>

            {/* User info */}
            <div className="flex-1 space-y-3 text-center md:text-left">
              <p className="text-xl font-semibold text-gray-800">
                {user?.displayName || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span>{" "}
                {user?.email || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span>{" "}
                {user?.phoneNumber || "Not added"}
              </p>
              {/* you can add more fields if you store in db */}
            </div>
          </div>

          <div className="card-actions justify-end p-4">
            <Link to="/updateProfile" className="btn btn-secondary text-primary-content">
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
