import axiosInstance from "./axiosInstance";

const authApi = {
  login: async (credentials) => {
    const response = await axiosInstance.post("/api/auth/signin", credentials);
    return response.data;
  },
};

export default authApi;
