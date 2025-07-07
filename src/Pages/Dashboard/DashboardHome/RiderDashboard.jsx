import React from "react";
import AuthHook from "../../../Hooks/AuthHook/AuthHook";
import UseAxiosSecure from "../../../Hooks/AxiosSecure/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Bar, Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Rectangle } from "react-leaflet";

const RiderDashboard = () => {
  const { user } = AuthHook();
  const axiosSecure = UseAxiosSecure();
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const { data: riders = [] } = useQuery({
    queryKey: ["parcelsStatusCount", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `rider/parcels/status-count/${user?.email}`
      );
      return res.data; // returns array of { delivery_status, count }
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl md:text-[56px] font-bold mb-4 text-center">
        Your Parcel Status Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10">
        {riders?.map((item) => (
          <div
            key={item.delivery_status}
            className={`card ${
              (item?.delivery_status === "delivered" && "bg-success/50") ||
              (item?.delivery_status === "in-transit" && "bg-orange-500/50") ||
              (item?.delivery_status === "rider_assigned" && "bg-yellow-500/50")
            } shadow p-4 py-10 text-center`}
          >
            <h3 className="font-semibold capitalize">
              {item?.delivery_status.replaceAll("_", " ")}
            </h3>
            <p className={`text-3xl font-bold text-primary-content`}>
              {item?.count}
            </p>
          </div>
        ))}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Your Parcel Status PieChart
      </h2>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={riders}
              dataKey="count"
              nameKey="delivery_status"
              isAnimationActive={false}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {riders.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiderDashboard;
