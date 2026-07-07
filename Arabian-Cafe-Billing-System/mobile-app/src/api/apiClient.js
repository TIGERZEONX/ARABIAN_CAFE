import axiosInstance from './axios'; // Assuming your custom axios instance is setup here
import { ENDPOINTS } from './endpoints'; // Assuming endpoints are exported here

export const apiClient = {
  get: async (url, params = {}) => {
    try {
      const response = await axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  post: async (url, data = {}) => {
    try {
      const response = await axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  put: async (url, data = {}) => {
    try {
      const response = await axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  delete: async (url) => {
    try {
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
};

export default apiClient;
