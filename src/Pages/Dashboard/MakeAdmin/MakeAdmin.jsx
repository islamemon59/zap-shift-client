import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../../Home/Shared/Loader/Loader";
import UseAxiosSecure from "../../../Hooks/AxiosSecure/UseAxiosSecure";

const MakeAdmin = () => {
  const axiosSecure = UseAxiosSecure();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(""); // search trigger

  // Fetch users by search
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["searchUsers", query],
    enabled: !!query,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${query}`);
      return res.data;
    },
  });

  // Toggle user role
  const handleToggleRole = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `This will change the role to "${newRole}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6", // blue confirm
      cancelButtonColor: "#d33", // red cancel
      confirmButtonText: `Yes, change to ${newRole}`,
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/${userId}`, { role: newRole });
        Swal.fire({
          icon: "success",
          title: `Role changed to "${newRole}"!`,
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `Could not change role: ${error.message}`,
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Optional small info alert
      Swal.fire({
        icon: "info",
        title: "Cancelled",
        text: "No changes were made.",
        timer: 1200,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">
        Manage User Roles
      </h2>

      {/* Search bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full"
        />
        <button
          onClick={() => setQuery(search.trim())}
          className="btn btn-secondary text-primary"
        >
          Search
        </button>
      </div>

      {/* Users Table */}
      {isLoading ? (
        <Loader />
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500 italic mt-4">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Email</th>
                <th>Created At</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "badge-success"
                          : "badge-neutral"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleToggleRole(user._id, user.role)}
                      className={`btn btn-sm ${
                        user.role === "admin" ? "btn-warning" : "btn-success"
                      }`}
                    >
                      {user.role === "admin" ? "Make User" : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
