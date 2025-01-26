import axiosInstance from "./axiosInstance";

const eventApi = {
  getEvents: async () => {
    const response = await axiosInstance.get("/api/event");
    return response.data;
  },
  getEventDetail: async (id) => {
    const response = await axiosInstance.get(`/api/event/${id}`);
    return response.data;
  },
  giftWheel: async (data) => {
    const response = await axiosInstance.post(`/api/gift/wheel`, data);
    return response.data;
  },
  getResultEvent: async (params) => {
    const response = await axiosInstance.get(`/api/event/result_event`, {
      params,
    });
    return response.data;
  },
};

export default eventApi;
