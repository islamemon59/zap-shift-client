import React from "react";

const HowItWorksCard = ({ step }) => {
  return (
    <div key={step.id} className="card bg-base-200 shadow-xl p-6">
      <div className="mb-4">{step.icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-primary-content">{step.title}</h3>
      <p className="text-base ">{step.description}</p>
    </div>
  );
};

export default HowItWorksCard;
