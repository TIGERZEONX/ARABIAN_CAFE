import api from "./api";

export const getTaxSettings = () =>
    api.get("/settings");

export const updateTaxSettings = (data) =>
    api.put("/settings", data);
