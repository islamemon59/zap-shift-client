import axios from "axios";
import React from "react";
import AuthHook from "../AuthHook/AuthHook";
import toast from "react-hot-toast";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

const UseAxiosSecure = () => {
  const { user } = AuthHook();
  //   console.log(user);

  axiosSecure.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // ✅ Response interceptor: check for 401 / 403
  axiosSecure.interceptors.response.use(
    (response) => response, // if success, just return
    async (error) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 401 || status === 403) {
          toast.error("Auth error detected:", status);
          // Example: logout user
        //   const auth = getAuth();
        //   await signOut(auth);
          // Optional: redirect to login page or show alert
        //   window.location.href = "/login"; // or use your router
        }
      }
      return Promise.reject(error); // pass error to original caller
    }
  );

  return axiosSecure;
};

export default UseAxiosSecure;
