import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import AuthHook from "../../../Hooks/AuthHook/AuthHook";
import UseAxiosSecure from "../../../Hooks/AxiosSecure/UseAxiosSecure";
import { uploadImage } from "../../../Api/ImageUploadApi";
import { useNavigate } from "react-router";

const UpdateProfile = () => {
  const { user, updateUserProfile, setUser } = AuthHook();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  // react-hook-form with default values
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
        name: user?.displayName || "",
    }
  });

  // mutation to patch user data
  const mutation = useMutation({
    mutationFn: async (name) => {
      const res = await axiosSecure.patch(`update-rider-name/${user.email}`, {
        name,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Profile updated successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
        reset(); // optional: clear form
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes detected.",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Update failed!",
        text: error.message,
      });
    },
  });

  // handle form submit
  const onSubmit = async (data) => {
    mutation.mutate(data?.name);
    const image = data.photoURL[0];
    const imageUrl = await uploadImage(image);
    const name = data?.name;

    try {
      await updateUserProfile(name, imageUrl);
      setUser({ ...user, displayName: name, photoURL: imageUrl });
      navigate("/dashboard/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body space-y-3">
          <h2 className="sm:text-4xl text-3xl text-start text-primary font-bold">
            Update Profile
          </h2>
          <p className="text-lg text-primary-content">Login with Profast</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="form-control space-y-2">
              <label className="label font-bold text-primary-content">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
                placeholder="Your name"
              />
            </div>

            {/* Photo URL */}
            <div className="form-control space-y-2">
              <label className="label font-bold text-primary-content">
                <span className="label-text">Upload Photo</span>
              </label>
              <input
                type="file"
                {...register("photoURL")}
                className="input input-bordered w-full"
                placeholder="Paste photo URL"
              />
            </div>

            {/* Submit button */}
            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn btn-secondary text-primary-content w-full"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
