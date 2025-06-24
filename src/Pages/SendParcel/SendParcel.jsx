import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2"; // ✅ ADDED
import AuthHook from "../../Hooks/AuthHook/AuthHook";

const AddParcelForm = ({ loggedInUser }) => {
  const [cost, setCost] = useState(null);
  const { user } = AuthHook();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const type = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const weight = Number(watch("weight")) || 0;

  const regions = [
    "Dhaka",
    "Chattogram",
    "Rajshahi",
    "Khulna",
    "Sylhet",
    "Barisal",
    "Rangpur",
    "Mymensingh",
  ];

  const serviceCenters = [
    "Dhaka Hub",
    "Chattogram Central",
    "Rajshahi Depot",
    "Khulna Point",
    "Sylhet Spot",
    "Barisal Unit",
    "Rangpur Stop",
    "Mymensingh Node",
  ];

  const calculateCost = (data) => {
    const withinCity = data.senderRegion === data.receiverRegion;

    if (data.type === "document") {
      return withinCity ? 60 : 80;
    } else if (data.type === "non-document") {
      if (weight <= 3) return withinCity ? 110 : 150;
      const extraKg = weight - 3;
      const extraCost = extraKg * 40;
      return withinCity ? 110 + extraCost : 150 + extraCost + 40;
    }
    return 0;
  };

  const onSubmit = async (data) => {
    const deliveryCost = calculateCost(data);
    setCost(deliveryCost);

    const result = await Swal.fire({
      title: "Confirm Delivery Details",
      icon: "info",
      html: `
        <p><strong>Parcel Type:</strong> ${data.type}</p>
        <p><strong>From:</strong> ${data.senderRegion} → <strong>To:</strong> ${
        data.receiverRegion
      }</p>
        <p><strong>Weight:</strong> ${data.weight || "-"} kg</p>
        <p><strong>Estimated Cost:</strong> ${deliveryCost}৳</p>
      `,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Confirm",
      denyButtonText: "Edit",
      cancelButtonText: "Cancel Order",
      confirmButtonColor: "#16a34a",
      denyButtonColor: "#0ea5e9",
      cancelButtonColor: "#dc2626",
    });

    if (result.isConfirmed) {
      confirmSubmission(data, deliveryCost);
    } else if (result.isDenied) {
      toast("📝 You can now edit your info.");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      reset();
      setCost(null);
      toast.error("❌ Parcel creation canceled.");
    }
  };

  const confirmSubmission = async (data, deliveryCost) => {
    const timestamp = Date.now();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `TRK-${timestamp}-${randomDigits}`;

    const formData = {
      ...data,
      creation_date: new Date().toISOString(),
      cost: deliveryCost,
      senderInfo: user?.email, 
      tracking_id: trackingId, // ✅ Added tracking ID
    };

    console.log("✅ Final Parcel Data:", formData);

    toast.success(`Parcel submitted!\nTracking ID: ${trackingId}`);
    reset();
    setCost(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-center">Add New Parcel</h2>
      <p className="text-gray-600 text-center mb-6">
        Fill out the details to create a delivery order
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <fieldset className="border border-gray-300 p-4 rounded-md">
          <legend className="text-lg font-semibold">Parcel Info</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="sm:col-span-2">
              <label className="label block mb-1">Parcel Type</label>
              <div className="flex gap-4 flex-wrap">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="document"
                    {...register("type", { required: true })}
                    className="radio"
                  />
                  Document
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="non-document"
                    {...register("type", { required: true })}
                    className="radio"
                  />
                  Non-Document
                </label>
              </div>
              {errors.type && (
                <p className="text-red-500 text-sm">Type is required</p>
              )}
            </div>

            <div>
              <label htmlFor="title" className="label block mb-1">
                Title
              </label>
              <input
                id="title"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">Title is required</p>
              )}
            </div>

            {type === "non-document" && (
              <div>
                <label htmlFor="weight" className="label block mb-1">
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  min="0.1"
                  step="0.1"
                  {...register("weight")}
                  className="input input-bordered w-full"
                />
              </div>
            )}
          </div>
        </fieldset>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sender Info */}
          <fieldset className="border border-gray-300 p-4 rounded-md">
            <legend className="text-lg font-semibold">Sender Info</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="senderName" className="label block mb-1">
                  Sender Name
                </label>
                <input
                  id="senderName"
                  type="text"
                  defaultValue={loggedInUser?.name}
                  {...register("senderName", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label htmlFor="senderContact" className="label block mb-1">
                  Contact
                </label>
                <input
                  id="senderContact"
                  type="text"
                  {...register("senderContact", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="senderAddress" className="label block mb-1">
                  Address
                </label>
                <input
                  id="senderAddress"
                  type="text"
                  {...register("senderAddress", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="senderServiceCenter"
                  className="label block mb-1"
                >
                  Service Center
                </label>
                <select
                  id="senderServiceCenter"
                  {...register("senderServiceCenter", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Service Center</option>
                  {serviceCenters.map((center) => (
                    <option key={center} value={center}>
                      {center}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="senderRegion" className="label block mb-1">
                  Region
                </label>
                <select
                  id="senderRegion"
                  {...register("senderRegion", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="pickupInstruction" className="label block mb-1">
                  Pickup Instruction
                </label>
                <textarea
                  id="pickupInstruction"
                  {...register("pickupInstruction", { required: true })}
                  className="textarea textarea-bordered w-full"
                  rows={2}
                />
              </div>
            </div>
          </fieldset>

          {/* Receiver Info */}
          <fieldset className="border border-gray-300 p-4 rounded-md">
            <legend className="text-lg font-semibold">Receiver Info</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="receiverName" className="label block mb-1">
                  Receiver Name
                </label>
                <input
                  id="receiverName"
                  type="text"
                  {...register("receiverName", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label htmlFor="receiverContact" className="label block mb-1">
                  Contact
                </label>
                <input
                  id="receiverContact"
                  type="text"
                  {...register("receiverContact", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="receiverAddress" className="label block mb-1">
                  Address
                </label>
                <input
                  id="receiverAddress"
                  type="text"
                  {...register("receiverAddress", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="receiverServiceCenter"
                  className="label block mb-1"
                >
                  Service Center
                </label>
                <select
                  id="receiverServiceCenter"
                  {...register("receiverServiceCenter", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Service Center</option>
                  {serviceCenters.map((center) => (
                    <option key={center} value={center}>
                      {center}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="receiverRegion" className="label block mb-1">
                  Region
                </label>
                <select
                  id="receiverRegion"
                  {...register("receiverRegion", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="deliveryInstruction"
                  className="label block mb-1"
                >
                  Delivery Instruction
                </label>
                <textarea
                  id="deliveryInstruction"
                  {...register("deliveryInstruction", { required: true })}
                  className="textarea textarea-bordered w-full"
                  rows={2}
                />
              </div>
            </div>
          </fieldset>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-secondary text-primary-content"
          >
            Calculate Cost
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddParcelForm;
