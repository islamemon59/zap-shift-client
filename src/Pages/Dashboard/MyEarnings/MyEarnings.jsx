import React, { useState, useMemo } from "react";
import UseAxiosSecure from "../../../Hooks/AxiosSecure/UseAxiosSecure";
import AuthHook from "../../../Hooks/AuthHook/AuthHook";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Home/Shared/Loader/Loader";

const MyEarnings = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = AuthHook();
  const riderEmail = user?.email;

  const [filter, setFilter] = useState("overall");

  // ✅ Fetch parcels assigned to this rider
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["riderEarnings", riderEmail],
    enabled: !!riderEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `rider/parcels/completed-deliveries?email=${riderEmail}`
      );
      return res.data;
    },
  });

  // ✅ Calculate earnings with filter
  const { totalEarnings, totalCashedOut, totalPending } = useMemo(() => {
    if (!parcels.length)
      return { totalEarnings: 0, totalCashedOut: 0, totalPending: 0 };

    const now = new Date();

    // filter parcels based on time
    const filteredParcels = parcels.filter((parcel) => {
      const createdAt = new Date(parcel.cashout_date);

      if (filter === "today") {
        return (
          createdAt.getFullYear() === now.getFullYear() &&
          createdAt.getMonth() === now.getMonth() &&
          createdAt.getDate() === now.getDate()
        );
      } else if (filter === "thisWeek") {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0); // important: remove time part
        return createdAt >= weekStart;
      } else if (filter === "thisMonth") {
        return (
          createdAt.getMonth() === now.getMonth() &&
          createdAt.getFullYear() === now.getFullYear()
        );
      } else if (filter === "thisYear") {
        return createdAt.getFullYear() === now.getFullYear();
      } else {
        return true; // overall
      }
    });

    // calculate earnings
    let total = 0;
    let cashedOut = 0;
    let pending = 0;

    filteredParcels.forEach((parcel) => {
      const isSameCenter =
        parcel.senderServiceCenter === parcel.receiverServiceCenter;
      const earning = isSameCenter ? parcel.cost * 0.8 : parcel.cost * 0.3;

      total += earning;

      if (parcel.cashout_status === "cashed_out") {
        cashedOut += earning;
      } else {
        pending += earning;
      }
    });

    return {
      totalEarnings: total.toFixed(2),
      totalCashedOut: cashedOut.toFixed(2),
      totalPending: pending.toFixed(2),
    };
  }, [parcels, filter]);

  if (isLoading) return <Loader/>;

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">📊 My Earnings</h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { key: "overall", label: "Overall" },
          { key: "today", label: "Today" },
          { key: "thisWeek", label: "This Week" },
          { key: "thisMonth", label: "This Month" },
          { key: "thisYear", label: "This Year" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`btn btn-xs ${
              filter === key ? "btn-secondary text-primary" : "btn-outline"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-100 rounded p-4 text-center">
          <div className="text-xl font-bold text-blue-700">
            ৳ {totalEarnings}
          </div>
          <div className="text-gray-600">Total Earnings</div>
        </div>
        <div className="bg-green-100 rounded p-4 text-center">
          <div className="text-xl font-bold text-green-700">
            ৳ {totalCashedOut}
          </div>
          <div className="text-gray-600">Total Cashed Out</div>
        </div>
        <div className="bg-yellow-100 rounded p-4 text-center">
          <div className="text-xl font-bold text-yellow-700">
            ৳ {totalPending}
          </div>
          <div className="text-gray-600">Pending Cash Out</div>
        </div>
      </div>
    </div>
  );
};

export default MyEarnings;
