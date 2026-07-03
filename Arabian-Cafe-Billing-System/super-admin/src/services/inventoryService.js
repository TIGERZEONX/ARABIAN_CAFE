import api from "./api";

export const getIngredients = () => api.get("/inventory");
export const createIngredient = (data) => api.post("/inventory", data);
export const updateIngredient = (id, data) => api.put(`/inventory/${id}`, data);
export const deleteIngredient = (id) => api.delete(`/inventory/${id}`);
export const getProfitLossReport = (params) => api.get("/inventory/report/profit-loss", { params });
