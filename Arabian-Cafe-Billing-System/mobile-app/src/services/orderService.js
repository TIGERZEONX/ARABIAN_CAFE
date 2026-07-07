import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';

export const orderService = {
  getOrders: async (params) => {
    return apiClient.get(ENDPOINTS.ORDERS.BASE, params);
  },
  
  createOrder: async (orderData) => {
    return apiClient.post(ENDPOINTS.ORDERS.BASE, orderData);
  },

  updateOrderStatus: async (orderId, status) => {
    return apiClient.put(`${ENDPOINTS.ORDERS.BASE}/${orderId}`, { status });
  }
};

export default orderService;
