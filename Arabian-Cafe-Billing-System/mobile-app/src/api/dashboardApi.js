import api from "./axios";

const dashboardApi = {
  getStats: async () => {
    const response = await api.get("/dashboard/stats");
    return response.data;
  },
  getSales: async () => {
    const response = await api.get("/dashboard/sales");
    return response.data;
  }
};

export default dashboardApi;
