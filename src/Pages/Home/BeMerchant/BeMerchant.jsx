import React from "react";
import location from "../../../assets/location-merchant.png";

const BeMerchant = () => {
  return (
    <div className=" bg-[url('assets/be-a-merchant-bg.png')] md:text-start text-center bg-no-repeat bg-primary rounded-4xl md:p-20">
      <div className="hero-content flex-col gap-8 lg:flex-row-reverse">
        <img
          src={location}
          className="sm:max-w-sm max-w-xs rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="md:text-5xl text-3xl font-bold text-base-100">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-base-100">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex gap-4 md:flex-row flex-col mt-4">
            <button className="btn btn-secondary text-primary-content rounded-full">
              Become a Merchant
            </button>
            <button className="btn btn-secondary active:text-primary-content btn-outline hover:text-primary-content  text-secondary rounded-full">
              Earn with Profast Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
