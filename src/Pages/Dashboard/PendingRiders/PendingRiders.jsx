import React, { useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/AxiosSecure/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Home/Shared/Loader/Loader";

const PendingRiders = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    data: riders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["Pending-Rider"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allRiders");
      return res.data;
    },
  });

  const [modalRider, setModalRider] = useState(null);

  if (isLoading) {
    return <Loader />;
  }

  const handleStatusChange = async (riderId, status, email) => {
    if (status === "cancelled") {
      // Show confirmation for cancel
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to cancel this rider request?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No, keep it",
      });

      if (!result.isConfirmed) return; // cancel pressed, do nothing
    }

    try {
      await axiosSecure.patch(`/riders/${riderId}`, { status, email });

      Swal.fire({
        icon: "success",
        title: `Request ${status}${
          status === "cancelled" ? " cancelled" : " active"
        }`,
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `Could not update rider status: ${error}`,
      });
    }
  };

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-5xl mx-auto mt-10">
        <h2 className="text-4xl md:text-[56px] font-semibold mb-4 text-center">
          Pending Rider Requests
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
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
                    No pending riders.
                  </td>
                </tr>
              ) : (
                riders.map((rider) => (
                  <tr
                    key={rider._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                      {rider.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {rider.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {rider.contact}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                      <button
                        onClick={() => setModalRider(rider)}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
                        aria-label={`View details of ${rider.name}`}
                      >
                        Details
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(rider._id, "active", rider?.email)
                        }
                        className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition"
                        aria-label={`Accept request from ${rider.name}`}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(rider._id, "cancelled")
                        }
                        className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition"
                        aria-label={`Cancel request from ${rider.name}`}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for rider details */}
      {modalRider && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <h3 className="text-xl font-semibold mb-4">Rider Details</h3>
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setModalRider(null)}
              aria-label="Close modal"
            >
              &#10005;
            </button>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Name:</strong> {modalRider.name}
              </p>
              <p>
                <strong>Email:</strong> {modalRider.email}
              </p>
              <p>
                <strong>Phone:</strong> {modalRider.contact}
              </p>
              {modalRider.address && (
                <p>
                  <strong>Address:</strong> {modalRider.address}
                </p>
              )}
              {modalRider.status && (
                <p>
                  <strong>Status:</strong> {modalRider.status}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PendingRiders;
