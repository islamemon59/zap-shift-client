import React, { useState } from "react";
import UseAxiosSecure from "../../../Hooks/AxiosSecure/UseAxiosSecure";
import AuthHook from "../../../Hooks/AuthHook/AuthHook";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../../Home/Shared/Loader/Loader";
import Swal from "sweetalert2";

const CompletedDeliveries = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = AuthHook();
  const riderEmail = user?.email;
  const [loadingParcelId, setLoadingParcelId] = useState(null);

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riderParcels", riderEmail],
    enabled: !!riderEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `rider/parcels/completed-deliveries?email=${riderEmail}`
      );
      return res.data;
    },
  });

  // ✅ Calculate earnings outside render for each parcel
  const parcelsWithEarnings = parcels.map((parcel) => {
    const isSameCenter =
      parcel.senderServiceCenter === parcel.receiverServiceCenter;
    const earning = isSameCenter ? parcel.cost * 0.8 : parcel.cost * 0.3;
    return { ...parcel, riderEarning: earning.toFixed(2) };
  });

  const { mutate: cashOut } = useMutation({
    mutationFn: async (parcel) => {
      setLoadingParcelId(parcel._id);
      const res = await axiosSecure.patch(`/parcels/${parcel._id}/cashout`, {
        cashout_amount: parcel.riderEarning,
      });
      return res.data;
    },
    onSuccess: (data, parcel) => {
      Swal.fire({
        icon: "success",
        title: `Cash out successful: ৳${parcel.riderEarning}`,
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
      setLoadingParcelId(null);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `Cash out failed: ${error.message}`,
      });
      setLoadingParcelId(null);
    },
  });

  const handleCashOut = async (parcel) => {
    const result = await Swal.fire({
      title: "Confirm Cash Out",
      text: `You’ll cash out ৳ ${parcel.riderEarning}. Are you sure?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, cash out",
      cancelButtonText: "Cancel",
      reverseButtons: true, // cancel on left, confirm on right (nicer UX)
    });

    if (result.isConfirmed) {
      cashOut(parcel); // call mutation
    } else {
      Swal.fire({
        icon: "info",
        title: "Cancelled",
        text: "Cash out was cancelled.",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Assigned Parcels</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Tracking ID</th>
              <th>Type</th>
              <th>Cost (৳)</th>
              <th>Service Centers</th>
              <th>Delivery Status</th>
              <th>Rider Earning (৳)</th>
              <th>Cash Out</th>
            </tr>
          </thead>
          <tbody>
            {parcelsWithEarnings.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-400 italic"
                >
                  No parcels found.
                </td>
              </tr>
            ) : (
              parcelsWithEarnings.map((parcel) => (
                <tr key={parcel._id}>
                  <td className="font-medium whitespace-nowrap">
                    {parcel.tracking_id}
                  </td>
                  <td>{parcel.type}</td>
                  <td>৳ {parcel.cost}</td>
                  <td className="max-w-[150px] whitespace-nowrap">
                    <span className="badge badge-info text-xs">
                      {parcel.senderServiceCenter} →{" "}
                      {parcel.receiverServiceCenter}
                    </span>
                  </td>
                  <td className="whitespace-nowrap">
                    <span className="badge badge-success text-xs">
                      {parcel.delivery_status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap text-green-600 font-semibold">
                    ৳ {parcel.riderEarning}
                  </td>
                  <td className="whitespace-nowrap text-right">
                    <button
                      onClick={() => handleCashOut(parcel)}
                      className="btn btn-xs btn-secondary text-primary"
                      disabled={parcel.cashout_status === "cashed_out"}
                    >
                      {loadingParcelId === parcel._id
                        ? "Processing..."
                        : "Cash Out"}
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

export default CompletedDeliveries;
