import api from "./api";

export const createOrder = (data) =>
    api.post("/orders", data);

export const getOrder = (id) =>
    api.get(`/orders/${id}`);

export const updateOrderStatus = (id, status) =>
    api.patch(`/orders/${id}/status`, { status });
