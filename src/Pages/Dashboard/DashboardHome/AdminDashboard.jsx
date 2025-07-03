import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/AxiosSecure/UseAxiosSecure";
import Loader from "../../Home/Shared/Loader/Loader";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Icons
import { FaTruck, FaClock, FaCheckCircle } from "react-icons/fa";

const AdminDashboard = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["parcel-status-counts"],
    queryFn: async () => {
      const res = await axiosSecure.get("parcel/delivery/status-count");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load data: {error.message}
      </div>
    );
  }

  // Pie chart colors & match status
  const COLORS = ["#FFC107", "#4CAF50", "#2196F3", "#9C27B0", "#FF5722"]; // add more if you have more statuses

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-3 flex items-center gap-2">
        📦 Parcel Delivery Status Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {data.map((item) => {
          let badgeColor = "badge-neutral";
          let icon = <FaTruck className="text-3xl text-gray-500" />;

          if (item.status === "delivered") {
            badgeColor = "badge-success";
            icon = <FaCheckCircle className="text-4xl text-green-500" />;
          } else if (item.status === "pending") {
            badgeColor = "badge-warning";
            icon = <FaClock className="text-4xl text-yellow-500" />;
          } else if (item.status === "in_transit") {
            badgeColor = "badge-info";
            icon = <FaTruck className="text-4xl text-blue-500" />;
          }

          return (
            <div
              key={item.status}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition rounded-xl border border-gray-200"
            >
              <div className="card-body items-center text-center space-y-3">
                {icon}
                <div className={`badge ${badgeColor} badge-lg capitalize`}>
                  {item.status.replaceAll("_", " ")}
                </div>
                <p className="text-5xl font-extrabold text-primary">
                  {item.count}
                </p>
                <p className="text-gray-500 text-sm">Total parcels</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pie chart section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          📊 Delivery Status Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, percent }) =>
                `${name.replaceAll("_", " ")} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [
                `${value} parcels`,
                name.replaceAll("_", " "),
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
