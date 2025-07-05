// src/pages/Coverage.jsx
import React from "react";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const districtData = useLoaderData();
  console.log(districtData);
  return (
    <div className=" mx-auto px-4 py-10 md:p-20">
      {/* 🔹 Main Title */}
      <h1 className="text-4xl md:text-[56px] text-primary font-bold text-start mb-6">
        We are available in 64 districts
      </h1>

      {/* 🗺️ Map Placeholder */}
      <BangladeshMap districtData={districtData} />
    </div>
  );
};

export default Coverage;
