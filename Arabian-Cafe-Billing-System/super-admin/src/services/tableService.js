import api from "./api";

export const getTables = () =>
    api.get("/tables");

export const getTable = (id) =>
    api.get(`/tables/${id}`);

export const createTable = (data) =>
    api.post("/tables", data);

export const updateTableStatus = (id, status, currentOrderId = null) =>
    api.patch(`/tables/${id}/status`, { status, currentOrderId });
