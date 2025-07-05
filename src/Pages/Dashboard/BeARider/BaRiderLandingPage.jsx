import React from "react";
import delivery from "../../../assets/tiny-deliveryman.png";
import frame from "../../../assets/Frame 5.png";
import { Link, useLoaderData } from "react-router";
import TopAgents from "./TopAgents";

const BaRiderLandingPage = () => {
  const agents = useLoaderData();
  return (
    <div className="space-y-14">
      <section className="flex justify-center items-center flex-col text-center py-20 px-4 space-y-4 shadow-xl rounded-4xl mt-8">
        <img src={delivery} alt="delivery-man" />

        <h2 className="md:text-[56px] text-4xl font-extrabold text-primary">
          How Earning Works
        </h2>
        <p className="max-w-2xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <div className="flex justify-center items-center">
          <Link
            to="/beARider"
            className="btn btn-secondary text-primary-content text-xl font-bold px-16 rounded-full"
          >
            Be a Rider
          </Link>
          <img src={frame} alt="icon" />
        </div>
      </section>

      <section className="space-y-12 mb-20">
        <h1 className="md:text-[56px] text-4xl font-extrabold text-primary text-center">
          Our Top Agents
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {agents.map((agent) => (
            <TopAgents key={agent.id} agent={agent}></TopAgents>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BaRiderLandingPage;
