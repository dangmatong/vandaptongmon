import axios from "axios";
import { clearUserData } from "../utils/auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL cơ bản của API
  timeout: 10000, // Thời gian chờ request (ms)
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để xử lý lỗi hoặc token
axiosInstance.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu cần
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi
    if (error.response?.status === 401) {
      clearUserData();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
