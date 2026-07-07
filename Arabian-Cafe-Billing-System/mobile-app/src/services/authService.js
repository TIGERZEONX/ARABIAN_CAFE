import AsyncStorage from "@react-native-async-storage/async-storage";

import authApi from "../api/authApi";

const TOKEN_KEY = "ACCESS_TOKEN";
const USER_KEY = "USER_DATA";

const authService = {
  // ==========================
  // Login
  // ==========================

  login: async (credentials) => {
    const response = await authApi.login(credentials);

    if (response?.token) {
      await AsyncStorage.setItem(
        TOKEN_KEY,
        response.token
      );
    }

    if (response?.user) {
      await AsyncStorage.setItem(
        USER_KEY,
        JSON.stringify(response.user)
      );
    }

    return response;
  },

  // ==========================
  // Logout
  // ==========================

  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.log(error);
    }

    await AsyncStorage.multiRemove([
      TOKEN_KEY,
      USER_KEY,
    ]);
  },

  // ==========================
  // Get Token
  // ==========================

  getToken: async () => {
    return await AsyncStorage.getItem(
      TOKEN_KEY
    );
  },

  // ==========================
  // Get User
  // ==========================

  getUser: async () => {
    const user = await AsyncStorage.getItem(
      USER_KEY
    );

    return user ? JSON.parse(user) : null;
  },

  // ==========================
  // Save User
  // ==========================

  saveUser: async (user) => {
    await AsyncStorage.setItem(
      USER_KEY,
      JSON.stringify(user)
    );
  },

  // ==========================
  // Check Login
  // ==========================

  isLoggedIn: async () => {
    const token = await AsyncStorage.getItem(
      TOKEN_KEY
    );

    return token !== null;
  },

  // ==========================
  // Clear Storage
  // ==========================

  clearStorage: async () => {
    await AsyncStorage.multiRemove([
      TOKEN_KEY,
      USER_KEY,
    ]);
  },

  // ==========================
  // Change Password
  // ==========================

  changePassword: async (data) => {
    return await authApi.changePassword(
      data
    );
  },

  // ==========================
  // Forgot Password
  // ==========================

  forgotPassword: async (email) => {
    return await authApi.forgotPassword(
      email
    );
  },

  // ==========================
  // Reset Password
  // ==========================

  resetPassword: async (
    token,
    password
  ) => {
    return await authApi.resetPassword(
      token,
      password
    );
  },

  // ==========================
  // Profile
  // ==========================

  getProfile: async () => {
    return await authApi.getProfile();
  },

  updateProfile: async (data) => {
    return await authApi.updateProfile(
      data
    );
  },
};

export default authService;