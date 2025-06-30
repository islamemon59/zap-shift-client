import axios from "axios";
import React, { useEffect } from "react";
import AuthHook from "../AuthHook/AuthHook";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

const UseAxiosSecure = () => {
  const { user } = AuthHook();
  const navigate = useNavigate();
  //   console.log(user);
  useEffect(() => {
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
      (response) => {
        // Success → just return data
        return response;
      },
      (error) => {
        // Error globally handled
        if (error.response) {
          const status = error.response.status;

          if (status === 401) {
            // navigate("/login")
            console.error("Unauthorized! Token might be invalid or expired.");
          } else if (status === 403) {
            navigate("/forbidden");
            console.error("Forbidden! You don't have permission.");
          } else if (status >= 500) {
            console.error("Server error! Please try again later.");
          }
        }

        // Always reject so calling code still knows there was an error
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosSecure;
};

export default UseAxiosSecure;
