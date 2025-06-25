import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FaEye, FaTrash } from "react-icons/fa";
import AuthHook from "../../../Hooks/AuthHook/AuthHook";
import UseAxiosSecure from "../../../Hooks/AxiosSecure/UseAxiosSecure";
import Swal from "sweetalert2";
import { MdOutlinePayments } from "react-icons/md";
import { useNavigate } from "react-router";
import Loader from "../../Home/Shared/Loader/Loader";

const MyParcel = () => {
  const { user } = AuthHook();
  const navigate = useNavigate()
  console.log(user.email);
  const axiosSecure = UseAxiosSecure();
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`parcels?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(parcels);

  if (isLoading) {
    return <Loader></Loader>
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this parcel deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`parcels/${id}`);
          console.log(res);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
            // OPTIONAL: Refetch or remove parcel from UI manually
          }
          refetch();
        } catch (error) {
          Swal.fire(
            "Error",
            "Something went wrong while deleting.",
            `${error}`
          );
        }
      }
    });
  };

  const handlePay = id => {
    navigate(`/dashboard/payment/${id}`)
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">📦 My Parcels</h2>

      {parcels.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">No parcels found yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base font-semibold text-gray-700">
              <tr>
                <th>No</th>
                <th>Type</th>
                <th>Title</th>
                <th>Date</th>
                <th>Cost (৳)</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td className="capitalize">{parcel.type}</td>
                  <td className="max-w-[150px] truncate">{parcel.title}</td>
                  <td>
                    {format(new Date(parcel.creation_date), "dd MMM yyyy")}
                  </td>
                  <td>{parcel.cost}</td>
                  <td className="capitalize">
                    <span
                      className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                        parcel.payment_status === "unpaid"
                          ? "bg-error text-red-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {parcel.payment_status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-info text-white">
                      <FaEye />
                    </button>
                    <button onClick={() => handlePay(parcel._id)} className="btn btn-sm btn-accent text-primary-content">
                      <MdOutlinePayments />
                    </button>
                    <button
                      onClick={() => handleDelete(parcel?._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyParcel;
