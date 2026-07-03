import api from "./api";

// Categories Management
export const getCategories = () =>
    api.get("/categories");

export const createCategory = (data) =>
    api.post("/categories", data);

// Menu Items Management
export const getMenuItems = (categoryId = null) => {
    const url = categoryId ? `/menu?categoryId=${categoryId}` : "/menu";
    return api.get(url);
};

export const getMenuItem = (id) =>
    api.get(`/menu/${id}`);

export const createMenuItem = (data) =>
    api.post("/menu", data);

export const updateMenuItem = (id, data) =>
    api.put(`/menu/${id}`, data);

export const deleteMenuItem = (id) =>
    api.delete(`/menu/${id}`);
