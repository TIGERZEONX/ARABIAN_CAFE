import api from "./axios";

// ==============================
// Order API
// ==============================

const orderApi = {
  // Get All Orders
  getOrders: async (params = {}) => {
    const response = await api.get("/orders", {
      params,
    });

    return response.data;
  },

  // Get Order By ID
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);

    return response.data;
  },

  // Create Order
  createOrder: async (order) => {
    const response = await api.post("/orders", order);

    return response.data;
  },

  // Update Order
  updateOrder: async (id, order) => {
    const response = await api.put(
      `/orders/${id}`,
      order
    );

    return response.data;
  },

  // Delete Order
  deleteOrder: async (id) => {
    const response = await api.delete(`/orders/${id}`);

    return response.data;
  },

  // Update Order Status
  updateOrderStatus: async (id, status) => {
    const response = await api.patch(
      `/orders/${id}/status`,
      {
        status,
      }
    );

    return response.data;
  },

  // Update Payment Status
  updatePaymentStatus: async (
    id,
    paymentStatus
  ) => {
    const response = await api.patch(
      `/orders/${id}/payment`,
      {
        paymentStatus,
      }
    );

    return response.data;
  },

  // Generate Bill
  generateBill: async (id) => {
    const response = await api.get(
      `/orders/${id}/bill`
    );

    return response.data;
  },

  // Today's Sales Report
  getTodaySales: async () => {
    const response = await api.get(
      "/orders/reports/today"
    );

    return response.data;
  },

  // Weekly Sales Report
  getWeeklySales: async () => {
    const response = await api.get(
      "/orders/reports/weekly"
    );

    return response.data;
  },

  // Monthly Sales Report
  getMonthlySales: async () => {
    const response = await api.get(
      "/orders/reports/monthly"
    );

    return response.data;
  },

  // Dashboard Summary
  getDashboardSummary: async () => {
    const response = await api.get(
      "/orders/dashboard"
    );

    return response.data;
  },
};

export default orderApi;