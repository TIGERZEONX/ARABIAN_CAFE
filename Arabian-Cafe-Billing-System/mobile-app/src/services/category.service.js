import axios from "axios";

const API = axios.create({
  baseURL: "http://YOUR_IP_ADDRESS:5000/api",
});

export const getCategories = async () => {
  return API.get("/categories");
};

export const createCategory = async (data) => {
  return API.post("/categories", data);
};