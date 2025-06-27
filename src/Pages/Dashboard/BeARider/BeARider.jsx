import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getAuth } from "firebase/auth";
import rider from "../../../assets/agent-pending.png";
import { useLoaderData } from "react-router";

const BeARider = () => {
  const { register, handleSubmit, reset, setValue } = useForm();

  const data = useLoaderData();
  console.log(data);

  //   Demo dynamic data
  //   const [regions] = useState(["Dhaka", "Chittagong", "Khulna", "Sylhet", "Rajshahi"]);
  //   const [warehouses] = useState(["Dhaka Central", "Chittagong Hub", "Khulna Depot"]);

  const regions = [...new Set(data.map((reg) => reg.region))];
  const warehouses = [...new Set(data.map((city) => city.city))];

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setValue("name", user.displayName || "");
      setValue("email", user.email || "");
    }
  }, [setValue]);

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      status: "pending",
      creationDate: new Date().toISOString(),
    };
    console.log("Rider form data:", finalData);
    // TODO: send to backend
    reset();
  };

  return (
    <div className="min-h-screen px-4 py-10 flex flex-col md:flex-row items-center justify-between">
      {/* Left: Title & Form */}
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl font-bold text-gray-800">Be a Rider</h2>
        <p className="text-gray-600">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              readOnly
            />
            <input
              {...register("age", { required: true })}
              type="number"
              placeholder="Your age"
              className="input input-bordered w-full"
            />
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
              readOnly
            />
            <select
              {...register("region", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select your region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <input
              {...register("nid", { required: true })}
              type="text"
              placeholder="NID No"
              className="input input-bordered w-full"
            />
            <input
              {...register("contact", { required: true })}
              type="text"
              placeholder="Contact"
              className="input input-bordered w-full"
            />
            <input
              {...register("bikeRegNumber", { required: true })}
              type="text"
              placeholder="Bike Registration Number"
              className="input input-bordered w-full"
            />
            <input
              {...register("bikeBrand", { required: true })}
              type="text"
              placeholder="Bike Brand"
              className="input input-bordered w-full"
            />
          </div>

          <textarea
            {...register("additionalInfo")}
            placeholder="Additional information"
            className="textarea textarea-bordered w-full"
          ></textarea>

          <select
            {...register("warehouse", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select warehouse you want to work</option>
            {warehouses.map((wh) => (
              <option key={wh} value={wh}>
                {wh}
              </option>
            ))}
          </select>

          <button type="submit" className="btn bg-lime-400 text-white w-full">
            Submit
          </button>
        </form>
      </div>

      {/* Right: Image */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img src={rider} alt="Rider" className="max-w-xs" />
      </div>
    </div>
  );
};

export default BeARider;
