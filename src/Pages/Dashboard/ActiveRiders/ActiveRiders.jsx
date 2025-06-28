import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/AxiosSecure/UseAxiosSecure";
import Loader from "../../Home/Shared/Loader/Loader";

const ActiveRiders = () => {
  const axiosSecure = UseAxiosSecure();

  // Load only active riders
  const {
    data: riders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=active");
      return res.data;
    },
  });

  // Handler to deactivate rider
  const handleDeactivate = async (riderId) => {
    try {
      await axiosSecure.patch(`/riders/${riderId}`, { status: "deactivated" });

      Swal.fire({
        icon: "success",
        title: "Rider deactivated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      refetch(); // refresh the list
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `Could not deactivate rider: ${error.message}`,
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        Active Riders
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {riders.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-8 text-gray-400 italic select-none"
                >
                  No active riders found.
                </td>
              </tr>
            ) : (
              riders.map((rider) => (
                <tr
                  key={rider._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {rider.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {rider.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {rider.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-2xl
      ${
        rider.status === "active"
          ? "bg-green-500 text-black"
          : "bg-red-100 text-red-800"
      }`}
                    >
                      {rider.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
