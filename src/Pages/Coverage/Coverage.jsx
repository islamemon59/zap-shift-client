// src/pages/Coverage.jsx
import React from "react";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const districtData = useLoaderData();
  console.log(districtData);
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* 🔹 Main Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-start mb-6">
        We are available in 64 districts
      </h1>

      {/* 🗺️ Map Placeholder */}
      <BangladeshMap districtData={districtData} />
    </div>
  );
};

export default Coverage;
