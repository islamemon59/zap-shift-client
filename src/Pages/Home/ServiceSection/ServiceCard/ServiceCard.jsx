import React from "react";

const ServiceCard = ({ service }) => {
  const { title, description, icon: Icon } = service;
  return (
    <div className="card bg-base-100 shadow-xl border border-transparent hover:shadow-2xl group duration-400 transition-all hover:bg-green-100 hover:border hover:border-green-300">
      <div className="card-body items-center text-center">
        <div className="text-4xl text-accent mb-4">
          <Icon />
        </div>
        <h3 className="card-title text-lg font-bold text-accent">{title}</h3>
        <p className="text-sm opacity-80 dark:group-hover:text-black">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
