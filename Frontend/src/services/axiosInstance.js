import axios from "axios";
import Cookies from "js-cookie";
const baseURL = "http://localhost:5000/api/users";

// const baseURL = "https://restaurant-listing-platform.onrender.com/api/users";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access:", error);
      if (axiosInstance.redirectToLogin) {
        axiosInstance.redirectToLogin();
      }
    }
    return Promise.reject(error);
  }
);

export const setRedirectFunction = (redirectFn) => {
  axiosInstance.redirectToLogin = redirectFn;
};

export default axiosInstance;
