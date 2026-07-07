import api from "./axios";

// ==============================
// Product API
// ==============================

const productApi = {
  // Get All Products
  getProducts: async (params = {}) => {
    const response = await api.get(
      "/products",
      {
        params,
      }
    );

    return response.data;
  },

  // Get Product By ID
  getProductById: async (id) => {
    const response = await api.get(
      `/products/${id}`
    );

    return response.data;
  },

  // Create Product
  createProduct: async (product) => {
    const response = await api.post(
      "/products",
      product
    );

    return response.data;
  },

  // Update Product
  updateProduct: async (
    id,
    product
  ) => {
    const response = await api.put(
      `/products/${id}`,
      product
    );

    return response.data;
  },

  // Delete Product
  deleteProduct: async (id) => {
    const response = await api.delete(
      `/products/${id}`
    );

    return response.data;
  },

  // Search Products
  searchProducts: async (keyword) => {
    const response = await api.get(
      "/products/search",
      {
        params: {
          q: keyword,
        },
      }
    );

    return response.data;
  },

  // Get Categories
  getCategories: async () => {
    const response = await api.get(
      "/products/categories"
    );

    return response.data;
  },

  // Get Products By Category
  getProductsByCategory: async (
    category
  ) => {
    const response = await api.get(
      "/products/category",
      {
        params: {
          category,
        },
      }
    );

    return response.data;
  },

  // Update Product Stock
  updateStock: async (
    id,
    stock
  ) => {
    const response = await api.patch(
      `/products/${id}/stock`,
      {
        stock,
      }
    );

    return response.data;
  },

  // Toggle Availability
  updateAvailability: async (
    id,
    available
  ) => {
    const response = await api.patch(
      `/products/${id}/availability`,
      {
        available,
      }
    );

    return response.data;
  },
};

export default productApi;