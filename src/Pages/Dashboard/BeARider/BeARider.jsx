import { useForm } from "react-hook-form";
import rider from "../../../assets/agent-pending.png";
import { useLoaderData } from "react-router";
import AuthHook from "../../../Hooks/AuthHook/AuthHook";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/AxiosSecure/UseAxiosSecure";

const BeARider = () => {
  const { register, handleSubmit, reset } = useForm();

  const data = useLoaderData();
  const { user } = AuthHook();
  const axiosSecure = UseAxiosSecure();

  const regions = [...new Set(data.map((reg) => reg.region))];
  const warehouses = [...new Set(data.map((city) => city.city))];

  const onSubmit = async (data) => {
    try {
      // Add creation date & status from frontend (can also do in backend)
      const riderData = {
        ...data,
        status: "pending",
        creationDate: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/riders", riderData);

      if (res.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Submitted!",
          text: "Your request to become a rider is pending approval.",
          confirmButtonColor: "#84cc16", // lime
        });
        console.log("Rider form data:", riderData);
        reset();
      }
    } catch (error) {
      console.error("Failed to submit rider data", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to submit your request. Please try again later.",
      });
    }
    // TODO: send to backend
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
              value={user?.displayName}
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
              value={user?.email}
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
              type="number"
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
