import React from "react";
import {
  MdLocalShipping,
  MdAttachMoney,
  MdLocationOn,
  MdBusiness,
} from "react-icons/md";
import HowItWorksCard from "./HowItWorksCard";

const HowItWorks = () => {
  const howItWorksData = [
    {
      id: 1,
      icon: <MdLocalShipping className="text-5xl text-primary" />,
      title: "Booking Pick & Drop",
      description:
        "Easily book pickup and drop-off from anywhere in your city.",
    },
    {
      id: 2,
      icon: <MdAttachMoney className="text-5xl text-primary" />,
      title: "Cash On Delivery",
      description:
        "Pay after delivery with our trusted cash-on-delivery service.",
    },
    {
      id: 3,
      icon: <MdLocationOn className="text-5xl text-primary" />,
      title: "Delivery Hub",
      description: "Manage deliveries from our network of nearby hubs.",
    },
    {
      id: 4,
      icon: <MdBusiness className="text-5xl text-primary" />,
      title: "Booking SME & Corporate",
      description:
        "Specialized solutions for businesses and corporate clients.",
    },
  ];
  return (
    <div>
      <section className="py-10 px-4 md:px-8 bg-base-100 text-start">
        <h2 className="text-3xl font-bold mb-10 text-primary-content">How it Works</h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksData.map((step) => (
            <HowItWorksCard step={step}></HowItWorksCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
