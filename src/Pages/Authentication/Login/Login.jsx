import { useForm } from "react-hook-form";
import AuthHook from "../../../Hooks/AuthHook/AuthHook";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import toast from "react-hot-toast";
const Login = () => {
  const { signInUser, resetPassword } = AuthHook();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  console.log(location);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onsubmit = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res);
        navigate(from);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleForgotPassword = () => {
    const nameValue = getValues("email");

    resetPassword(nameValue)
      .then(() => {
        toast.success("reset password email sent");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0">
      <div className="card-body">
        <h1 className="sm:text-4xl text-3xl text-start text-primary font-bold">
          Welcome Back
        </h1>
        <p className="text-lg text-primary-content">Login with Profast</p>
        <form onSubmit={handleSubmit(onsubmit)}>
          <fieldset className="fieldset">
            <label className="label font-bold text-primary-content">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full mb-2"
              placeholder="Email"
            />
            {errors.password?.type === "required" && (
              <span className="text-error font-semibold">
                This field is required
              </span>
            )}
            <label className="label font-bold text-primary-content">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <span className="text-error font-semibold">
                This field is required
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-error font-semibold">
                Password must be at least 6 characters long
              </span>
            )}
            <div onClick={handleForgotPassword}>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-secondary text-primary-content mt-4">
              Login
            </button>
            <Link
              to="/register"
              className="text-primary-content text-[15px] mt-2"
            >
              Don't have an account?{" "}
              <span className="text-secondary cursor-pointer hover:underline">
                Register
              </span>
            </Link>
            <SocialLogin />
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
