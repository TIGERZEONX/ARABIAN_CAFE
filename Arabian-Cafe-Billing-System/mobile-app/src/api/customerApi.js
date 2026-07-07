import api from "./axios";

// ==============================
// Customer API
// ==============================

const customerApi = {
  // Get All Customers
  getCustomers: async (params = {}) => {
    const response = await api.get("/customers", {
      params,
    });

    return response.data;
  },

  // Get Customer By ID
  getCustomerById: async (id) => {
    const response = await api.get(`/customers/${id}`);

    return response.data;
  },

  // Create Customer
  createCustomer: async (customer) => {
    const response = await api.post(
      "/customers",
      customer
    );

    return response.data;
  },

  // Update Customer
  updateCustomer: async (
    id,
    customer
  ) => {
    const response = await api.put(
      `/customers/${id}`,
      customer
    );

    return response.data;
  },

  // Delete Customer
  deleteCustomer: async (id) => {
    const response = await api.delete(
      `/customers/${id}`
    );

    return response.data;
  },

  // Search Customers
  searchCustomers: async (keyword) => {
    const response = await api.get(
      "/customers/search",
      {
        params: {
          q: keyword,
        },
      }
    );

    return response.data;
  },

  // Purchase History
  getPurchaseHistory: async (id) => {
    const response = await api.get(
      `/customers/${id}/orders`
    );

    return response.data;
  },

  // Loyalty Information
  getLoyalty: async (id) => {
    const response = await api.get(
      `/customers/${id}/loyalty`
    );

    return response.data;
  },

  // Update Loyalty
  updateLoyalty: async (
    id,
    loyaltyData
  ) => {
    const response = await api.patch(
      `/customers/${id}/loyalty`,
      loyaltyData
    );

    return response.data;
  },

  // Top Customers
  getTopCustomers: async () => {
    const response = await api.get(
      "/customers/top"
    );

    return response.data;
  },
};

export default customerApi;