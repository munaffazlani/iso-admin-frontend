import axios from "axios";
import { message } from "antd";

const proxy = "https://cors-anywhere.herokuapp.com/";
const baseURL = "http://ec2-54-237-15-67.compute-1.amazonaws.com:3000/api/v1/";

// SECTION - AXIOS INSTANCE

// Axios NoAuth Instance
export const axiosInstance = axios.create({
  baseURL: proxy + baseURL,
  headers: {
    "content-type": "application/json",
    accept: "application/json",
  },
});

// Axios Auth Instance
export const axiosAuthInstance = axios.create({
  baseURL: proxy + baseURL,
  headers: {
    "content-type": "application/json",
    accept: "application/json",
  },
});

// SECTION - API URLS
export const apiUrl = {
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgetpassword",
  CHANGE_PASSWORD: "/changepassword",
  USER_PROFILE: "/profile",
  LOGOUT: "/logout",
};

// Intrceptors for Axios NoAuth Instance - Response
axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const { data } = error.response;
    if (data && data.message) {
      message.error(data.message);
    }
    return Promise.reject(error);
  }
);

// Intrceptors for Axios auth Instance - for request - for adding token from sesssion storage

axiosAuthInstance.interceptors.request.use((config) => {
  const accessToken =
    localStorage.getItem("user_token") || sessionStorage.getItem("user_token");
  config.headers["Authorization"] = accessToken ? `Bearer ${accessToken}` : "";
  return config;
});
