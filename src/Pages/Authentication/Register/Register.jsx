import React from "react";
import { useForm } from "react-hook-form";
import AuthHook from "../../../Hooks/AuthHook/AuthHook";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";

const Register = () => {
  const { createUser } = AuthHook();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((res) => {
        console.log(res);
        navigate(from);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0">
      <div className="card-body">
        <h1 className="text-4xl text-start text-primary font-bold">
          Create an Account
        </h1>
        <p className="text-lg text-primary-content">Register with Profast</p>
        <form autoComplete="off" onSubmit={handleSubmit(onsubmit)}>
          <fieldset className="fieldset">
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
            {errors.password?.type === "required" && (
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
