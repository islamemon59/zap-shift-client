import React from "react";

const BenefitCard = ({ item }) => {
  const { title, desc, img } = item;
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 py-14">
      {/* Left text */}
      <img
        src={img}
        alt={title}
        className="w-52 mx-auto object-contain"
        loading="lazy"
      />

      {/* Dashed divider (horizontal or vertical depending on screen size) */}
      <div className="w-full md:w-px h-px md:h-40 border-t md:border-t-0 md:border-l-2 border-dashed border-accent" />

      {/* Right image */}
      <div>
        <h3 className="text-xl font-bold mb-2 text-accent">{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
