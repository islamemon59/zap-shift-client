import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthHook from "../../../Hooks/AuthHook/AuthHook";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import { uploadImage } from "../../../Api/ImageUploadApi";
import UseAxios from "../../../Hooks/AxiosSecure/UseAxios";

const Register = () => {
  const { createUser, updateUserProfile } = AuthHook();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const [imageUrl, setImageUrl] = useState("");
  const axiosInstance = UseAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(async (res) => {
        const userInfo = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        try {
          const { data } = await axiosInstance.post("users", userInfo);
          console.log(data);
        } catch (err) {
          console.log(err.message);
        }

        updateUserProfile(data?.name, imageUrl)
          .then((res) => {
            console.log("user profile Updated", res);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(res);
        navigate(from);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleUploadImage = async (e) => {
    const image = e.target.files[0];
    console.log(image);

    try {
      const imageData = await uploadImage(image);
      console.log(imageData);
      setImageUrl(imageData);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0">
      <div className="card-body">
        <h1 className="sm:text-4xl text-3xl text-start text-primary font-bold">
          Create an Account
        </h1>
        <p className="text-lg text-primary-content">Register with Profast</p>
        <form autoComplete="off" onSubmit={handleSubmit(onsubmit)}>
          <fieldset className="fieldset">
            <label className="label font-bold text-primary-content">
              Your Name
            </label>
            <input
              autoComplete="off"
              type="text"
              {...register("name", { required: true })}
              className="input mb-2 w-full"
              placeholder="Your Name"
            />
            <label className="label font-bold text-primary-content">
              Upload Your Image
            </label>
            <input
              onChange={handleUploadImage}
              autoComplete="off"
              type="file"
              className="input mb-2 w-full"
              placeholder="Upload Your Image"
            />
            <label className="label font-bold text-primary-content">
              Email
            </label>
            <input
              autoComplete="off"
              type="email"
              {...register("email", { required: true })}
              className="input mb-2 w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <span className="text-error font-semibold text-sm mt-1">
                This field is required
              </span>
            )}
            <label className="label font-bold text-primary-content">
              Password
            </label>
            <input
              autoComplete="off"
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                validate: {
                  hasUppercase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Password must contain at least one uppercase letter",
                  hasLowercase: (value) =>
                    /[a-z]/.test(value) ||
                    "Password must contain at least one lowercase letter",
                },
              })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <span className="text-error font-semibold text-sm mt-1">
                This field is required
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-error font-semibold text-sm mt-1">
                Password must be at least 6 characters long
              </span>
            )}
            {errors.password && (
              <p className="text-error text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            {errors.password && (
              <p className="text-error text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <button className="btn btn-secondary text-primary-content mt-4">
              Register
            </button>
            <Link to="/login" className="text-primary-content text-[15px] mt-2">
              Already have an account?{" "}
              <span className="text-secondary cursor-pointer hover:underline">
                Login
              </span>
            </Link>
            <SocialLogin />
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
