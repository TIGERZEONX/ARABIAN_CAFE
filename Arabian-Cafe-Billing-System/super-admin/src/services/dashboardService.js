import api from "./api";

export const getDashboardStats = () =>
    api.get("/dashboard/stats");

export const getSalesChartData = () =>
    api.get("/dashboard/sales");
