import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../../Home/Shared/Loader/Loader";
import UseAxiosSecure from "../../../Hooks/AxiosSecure/UseAxiosSecure";
import useTrackingLogger from "../../../Hooks/useTrackingLogger/useTrackingLogger";
import AuthHook from "../../../Hooks/AuthHook/AuthHook";

const AssignRider = () => {
  const axiosSecure = UseAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [matchDistrict, setMatchDistrict] = useState([]);
  const { logTracking } = useTrackingLogger();
  const { user } = AuthHook();

  // Load parcels ready to assign
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/assignable");
      return res.data;
    },
  });

  // Load active riders
  const { data: activeRiders = [] } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=active");
      return res.data;
    },
  });

  console.log(activeRiders);

  // Filter: rider.warehouse === parcel.senderServiceCenter
  useEffect(() => {
    const matchedRiders = selectedParcel
      ? activeRiders.filter(
          (r) => r.warehouse.trim() == selectedParcel.senderServiceCenter.trim()
        )
      : [];
    console.log(matchedRiders);
    setMatchDistrict(matchedRiders);
  }, [activeRiders, selectedParcel]);

  console.log(selectedParcel);

  // Assign handler
  const handleAssignRider = async (parcelId, riderId, rider, tracking_id) => {
    try {
      // Step 1: update parcel
      await axiosSecure.patch(`/parcels/${parcelId}`, {
        assigned_rider: riderId,
        riderEmail: rider.email,
        riderName: rider.name,
        delivery_status: "rider_assigned",
      });

      await logTracking({
        tracking_id: tracking_id,
        status: "rider_assigned",
        details: `Assigned to ${rider?.name}`,
        updated_by: user?.email,
      });

      Swal.fire({
        icon: "success",
        title: "Rider assigned & parcel now rider_assigned",
        timer: 1500,
        showConfirmButton: false,
      });

      setSelectedParcel(null); // close modal
      refetch(); // refresh parcel list
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not assign rider",
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        Assign Rider – Parcels Paid & Not Collected
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Tracking ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No parcels available for assignment.
                </td>
              </tr>
            ) : (
              parcels.map((parcel) => (
                <tr key={parcel._id} className="hover:bg-gray-50 transition">
                  <td className="font-semibold text-gray-800">
                    {parcel.tracking_id}
                  </td>
                  <td>
                    <div className="text-sm text-gray-700">
                      {parcel.senderName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {parcel.senderServiceCenter}
                    </div>
                  </td>
                  <td>
                    <div className="text-sm text-gray-700">
                      {parcel.receiverName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {parcel.receiverServiceCenter}
                    </div>
                  </td>
                  <td className="text-gray-700">৳ {parcel.cost}</td>
                  <td>
                    <span className="badge badge-success">
                      {parcel.payment_status}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-warning">
                      {parcel.delivery_status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary text-primary"
                      onClick={() => setSelectedParcel(parcel)}
                    >
                      Assign Rider
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedParcel && (
        <div className="fixed inset-0 bg-transparent bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-md max-w-lg w-full p-6 shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Assign Rider to: {selectedParcel.tracking_id}
            </h3>
            {matchDistrict.length === 0 ? (
              <p className="text-gray-500">
                No active riders found in warehouse:{" "}
                <b>{selectedParcel.senderServiceCenter}</b>
              </p>
            ) : (
              <ul className="space-y-3 max-h-60 overflow-y-auto">
                {matchDistrict.map((rider) => (
                  <li
                    key={rider._id}
                    className="flex justify-between items-center border p-2 rounded"
                  >
                    <div>
                      <div className="font-medium">{rider.name}</div>
                      <div className="text-xs text-gray-500">
                        {rider.email} | Warehouse: {rider.warehouse}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleAssignRider(
                          selectedParcel._id,
                          rider._id,
                          rider,
                          selectedParcel.tracking_id
                        )
                      }
                      className="btn btn-sm btn-secondary text-primary"
                    >
                      Assign
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedParcel(null)}
                className="btn btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
