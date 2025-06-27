import axios from "axios";
import React from "react";
import AuthHook from "../AuthHook/AuthHook";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

const UseAxiosSecure = () => {

    const {user} = AuthHook()

  axios.interceptors.request.use(
     (config) => {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${user.accessToken}`
      return config;
    },
     (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default UseAxiosSecure;
