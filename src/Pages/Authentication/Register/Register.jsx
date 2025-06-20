import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const onsubmit = (data) => {
    console.log(data);
  };


  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-4xl text-center text-primary font-bold">
          Create an Account
        </h1>
        <form autoComplete="off" onSubmit={handleSubmit(onsubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
            autoComplete="off"
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.password?.type === "required" && (
              <span className="text-error font-semibold text-sm mt-1">
                This field is required
              </span>
            )}
            <label className="label">Password</label>
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
              className="input"
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
            {errors.password && (<p className="text-error text-sm mt-1">{errors.password.message}</p>)}
            {errors.password && (<p className="text-error text-sm mt-1">{errors.password.message}</p>)}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
