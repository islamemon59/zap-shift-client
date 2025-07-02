import AuthHook from "../../../Hooks/AuthHook/AuthHook";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/AxiosSecure/UseAxiosSecure";
import Loader from "../../Home/Shared/Loader/Loader";
import useTrackingLogger from "../../../Hooks/useTrackingLogger/useTrackingLogger";

const PendingDeliveries = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = AuthHook(); // get logged-in user
  const riderEmail = user?.email;
  console.log(riderEmail);
  const { logTracking } = useTrackingLogger();

  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["riderParcels", riderEmail],
    enabled: !!riderEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `pending-for-rider?riderEmail=${riderEmail}`
      );
      return res.data;
    },
  });

  console.log(parcels);

  // update delivery_status
  const handleUpdateStatus = async (parcelId, newStatus, tracking_id) => {
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to mark this parcel as ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`parcels/${parcelId}/delivery-status`, {
          delivery_status: newStatus,
        });

        if (newStatus === "in-transit") {
          await logTracking({
            tracking_id: tracking_id,
            status: newStatus,
            details: `Picked up by ${user?.displayName}`,
            updated_by: user?.email,
          });
        }
        if (newStatus === "delivered") {
          await logTracking({
            tracking_id: tracking_id,
            status: newStatus,
            details: `Delivered by ${user?.displayName}`,
            updated_by: user?.email,
          });
        }

        Swal.fire({
          icon: "success",
          title: `Status updated to "${newStatus.replace("-", " ")}"`,
          timer: 1500,
          showConfirmButton: false,
        });

        refetch(); // refresh table
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error updating status",
        });
      }
    } else {
      // rider clicked Cancel → optional: show info
      Swal.fire({
        icon: "info",
        title: "Action cancelled",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Assigned Parcels</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Tracking ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Cost</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-400 italic"
                >
                  No pending parcels.
                </td>
              </tr>
            ) : (
              parcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td className="font-semibold">{parcel.tracking_id}</td>
                  <td>{parcel.senderName}</td>
                  <td>{parcel.receiverName}</td>
                  <td>৳ {parcel.cost}</td>
                  <td>
                    <span className="badge badge-info">
                      {parcel.delivery_status}
                    </span>
                  </td>
                  <td className="space-x-2">
                    {parcel.delivery_status === "rider_assigned" && (
                      <button
                        onClick={() =>
                          handleUpdateStatus(
                            parcel._id,
                            "in-transit",
                            parcel.tracking_id
                          )
                        }
                        className="btn btn-xs btn-secondary text-primary"
                      >
                        Mark as Picked Up
                      </button>
                    )}
                    {parcel.delivery_status === "in-transit" && (
                      <button
                        onClick={() =>
                          handleUpdateStatus(
                            parcel._id,
                            "delivered",
                            parcel.tracking_id
                          )
                        }
                        className="btn btn-xs btn-secondary text-primary"
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingDeliveries;
