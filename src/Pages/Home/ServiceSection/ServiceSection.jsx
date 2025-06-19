import React from "react";
import { FaShippingFast, FaMapMarkedAlt, FaWarehouse } from "react-icons/fa";
import { MdOutlinePayments, MdOutlineBusinessCenter } from "react-icons/md";
import { BsArrowRepeat } from "react-icons/bs";
import ServiceCard from "./ServiceCard/ServiceCard";

const ServiceSection = () => {
  const services = [
    {
      icon: FaShippingFast,
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      icon: FaMapMarkedAlt,
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      icon: FaWarehouse,
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      icon: MdOutlinePayments,
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      icon: MdOutlineBusinessCenter,
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      icon: BsArrowRepeat,
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto p-6 my-20">
      {/* Section header */}
      <header className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl text-accent font-extrabold">Our Services</h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Enjoy fast, reliable parcel delivery with real‑time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </header>
      {/* Service Card */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
