import api from "./axios";

// ==============================
// Inventory API
// ==============================

const inventoryApi = {
  // ==============================
  // Get All Inventory Items
  // ==============================

  getInventory: async (params = {}) => {
    const response = await api.get("/inventory", {
      params,
    });

    return response.data;
  },

  // ==============================
  // Get Inventory Item By ID
  // ==============================

  getInventoryById: async (id) => {
    const response = await api.get(
      `/inventory/${id}`
    );

    return response.data;
  },

  // ==============================
  // Create Inventory Item
  // ==============================

  createInventory: async (data) => {
    const response = await api.post(
      "/inventory",
      data
    );

    return response.data;
  },

  // ==============================
  // Update Inventory Item
  // ==============================

  updateInventory: async (
    id,
    data
  ) => {
    const response = await api.put(
      `/inventory/${id}`,
      data
    );

    return response.data;
  },

  // ==============================
  // Delete Inventory Item
  // ==============================

  deleteInventory: async (id) => {
    const response = await api.delete(
      `/inventory/${id}`
    );

    return response.data;
  },

  // ==============================
  // Update Stock Quantity
  // ==============================

  updateStock: async (
    id,
    quantity
  ) => {
    const response = await api.patch(
      `/inventory/${id}/stock`,
      {
        quantity,
      }
    );

    return response.data;
  },

  // ==============================
  // Stock In
  // ==============================

  stockIn: async (
    id,
    quantity
  ) => {
    const response = await api.patch(
      `/inventory/${id}/stock-in`,
      {
        quantity,
      }
    );

    return response.data;
  },

  // ==============================
  // Stock Out
  // ==============================

  stockOut: async (
    id,
    quantity
  ) => {
    const response = await api.patch(
      `/inventory/${id}/stock-out`,
      {
        quantity,
      }
    );

    return response.data;
  },

  // ==============================
  // Low Stock Items
  // ==============================

  getLowStockItems: async () => {
    const response = await api.get(
      "/inventory/low-stock"
    );

    return response.data;
  },

  // ==============================
  // Inventory Summary
  // ==============================

  getInventorySummary: async () => {
    const response = await api.get(
      "/inventory/summary"
    );

    return response.data;
  },
};

export default inventoryApi;