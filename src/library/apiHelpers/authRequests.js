import {
  axiosAuthInstance,
  axiosInstance,
  apiUrl,
} from "./axiosInstance";

// Login
export const login = (payload) => {
  payload.type = 2;
  return axiosInstance({
    method: "POST",
    url: `${apiUrl.LOGIN}`,
    data: JSON.stringify(payload),
  });
};

// Forgot Password
export const forgotpassword = (payload) => {
  return axiosInstance({
    method: "POST",
    url: `${apiUrl.FORGOT_PASSWORD}`,
    data: JSON.stringify(payload),
  });
};

// Reset Password
export const changePassword = (payload) => {
  return axiosInstance({
    method: "POST",
    url: `${apiUrl.CHANGE_PASSWORD}`,
    data: JSON.stringify(payload),
  });
};

// Get Profile
export const getProfile = () => {
  return axiosAuthInstance({
    method: "GET",
    url: `${apiUrl.USER_PROFILE}`,
  });
};
