import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';

export const customerService = {
  getCustomers: async (params) => {
    return apiClient.get(ENDPOINTS.CUSTOMERS.BASE, params);
  },
  
  createCustomer: async (customerData) => {
    // Add validation before hitting the API
    if (!customerData.name || !customerData.phone) {
      throw new Error('Name and phone are required');
    }
    return apiClient.post(ENDPOINTS.CUSTOMERS.BASE, customerData);
  }
};

export default customerService;
