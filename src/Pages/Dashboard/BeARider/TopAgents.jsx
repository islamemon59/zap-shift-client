import React from "react";

const TopAgents = ({agent}) => {
  return (
    <div
      key={agent.id}
      className="p-4 bg-white rounded-3xl shadow hover:shadow-md transition"
    >
      <img
        src={agent.image}
        alt={agent.name}
        className="w-full h-76 object-cover rounded-3xl"
      />
      <div className="mt-4 space-y-4">
        <h3 className="text-[28px] font-bold text-primary-content">{agent.name}</h3>
        <p className="text-primary-content">{agent.short_name}</p>
      </div>
    </div>
  );
};

export default TopAgents;
