import React from "react";

const ServiceCard = ({service}) => {
    const {title, description, icon: Icon} = service
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-400">
      <div className="card-body items-center text-center">
        <div className="text-4xl text-accent mb-4">
          <Icon />
        </div>
        <h3 className="card-title text-lg font-bold text-accent">{title}</h3>
        <p className="text-sm opacity-80">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
