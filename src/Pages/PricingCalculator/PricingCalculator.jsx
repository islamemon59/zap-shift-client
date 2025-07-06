import React, { useState } from "react";
import toast from "react-hot-toast";

const PricingCalculator = () => {
  const [type, setType] = useState("document");
  const [location, setLocation] = useState("within");
  const [weight, setWeight] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [calculationDetails, setCalculationDetails] = useState(""); // new state

  const handleCalculate = () => {
    let price = 0;
    let details = "";
    const numericWeight = parseFloat(weight) || 0;

    if (type === "document") {
      price = location === "within" ? 60 : 80;
      details = `Document delivery: ${
        location === "within" ? "Within City" : "Outside City/District"
      } → ${price} BDT`;
    } else if (type === "non-document") {
      if (numericWeight <= 0) {
        return toast.error(
          "Please enter a valid weight for non-document parcels."
        );
      }

      if (numericWeight <= 3) {
        price = location === "within" ? 110 : 150;
        details = `Non-Document under 3kg: ${
          location === "within" ? "Within City" : "Outside City/District"
        } → ${price} BDT`;
      } else {
        price = location === "within" ? 110 : 150;
        const extraKg = Math.ceil(numericWeight - 3);
        const extraCost = extraKg * 40;
        price += extraCost;

        if (location === "outside") {
          price += 40; // extra for outside city
          details = `Non-Document over 3kg (${numericWeight}kg): Base ${
            location === "within" ? 110 : 150
          } BDT + Extra ${extraKg}kg × 40 BDT = ${extraCost} BDT + 40 BDT (outside city charge) → Total ${price} BDT`;
        } else {
          details = `Non-Document over 3kg (${numericWeight}kg): Base 110 BDT + Extra ${extraKg}kg × 40 BDT = ${extraCost} BDT → Total ${price} BDT`;
        }
      }
    }

    setCalculatedPrice(price);
    setCalculationDetails(details);
  };

  const handleReset = () => {
    setType("document");
    setLocation("within");
    setWeight("");
    setCalculatedPrice(null);
    setCalculationDetails("");
  };

  return (
    <div className="mx-auto p-6 md:p-20 bg-base-100 rounded-lg shadow mt-4 md:mt-10">
      {/* Title & subtitle at top */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-[36px] font-bold text-primary mb-2">
          Pricing Calculator
        </h2>
        <p className="text-primary-content max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div className="divider"></div>

      {/* Grid: left form, right result */}
      <div className="grid md:grid-cols-2 gap-8 md:p-10">
        {/* Left: form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCalculate();
          }}
          className="space-y-4 flex-1"
        >
          <div>
            <label className="label font-semibold">Parcel Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="document">Document</option>
              <option value="non-document">Non Document</option>
            </select>
          </div>

          <div>
            <label className="label font-semibold">Delivery Area</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="within">Within City</option>
              <option value="outside">Outside City/District</option>
            </select>
          </div>

          {type === "non-document" && (
            <div>
              <label className="label font-semibold">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight"
                className="input input-bordered w-full"
                min="0.1"
                step="0.1"
              />
            </div>
          )}

          <div className="flex space-x-4 mt-4">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-outline btn-secondary text-primary-content"
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn btn-secondary text-primary-content"
            >
              Calculate
            </button>
          </div>
        </form>

        {/* Right: calculated price */}
        <div className="flex flex-1 flex-col justify-center items-center rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Calculated Price</h3>
          {calculatedPrice !== null ? (
            <>
              <div className="text-4xl font-bold text-primary mb-4">
                {calculatedPrice} BDT
              </div>
              <p className="text-center text-primary-content">{calculationDetails}</p>
            </>
          ) : (
            <p className="text-gray-500">
              Fill in the form and click calculate
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
