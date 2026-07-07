import api from "./axios";

// ==============================
// Authentication API
// ==============================

const authApi = {
  // Login
  login: async (credentials) => {
    const response = await api.post(
      "/auth/login",
      credentials
    );

    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post(
      "/auth/logout"
    );

    return response.data;
  },

  // Refresh Token
  refreshToken: async (refreshToken) => {
    const response = await api.post(
      "/auth/refresh-token",
      {
        refreshToken,
      }
    );

    return response.data;
  },

  // Current User Profile
  getProfile: async () => {
    const response = await api.get(
      "/auth/profile"
    );

    return response.data;
  },

  // Update Profile
  updateProfile: async (data) => {
    const response = await api.put(
      "/auth/profile",
      data
    );

    return response.data;
  },

  // Change Password
  changePassword: async (data) => {
    const response = await api.put(
      "/auth/change-password",
      data
    );

    return response.data;
  },

  // Forgot Password
  forgotPassword: async (email) => {
    const response = await api.post(
      "/auth/forgot-password",
      {
        email,
      }
    );

    return response.data;
  },

  // Reset Password
  resetPassword: async (
    token,
    password
  ) => {
    const response = await api.post(
      "/auth/reset-password",
      {
        token,
        password,
      }
    );

    return response.data;
  },
};

export default authApi;