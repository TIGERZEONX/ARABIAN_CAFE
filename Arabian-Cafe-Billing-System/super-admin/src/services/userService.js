import api from "./api";

export const getUsers = () => api.get("/users");
export const getRoles = () => api.get("/users/roles");
export const createUser = (data) => api.post("/users", data);
export const deleteUser = (id) => api.delete(`/users/${id}`);
