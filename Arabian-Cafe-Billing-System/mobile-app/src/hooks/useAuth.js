import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import authService from "../services/authService";

import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
  updateUser,
  clearError,
} from "../store/slices/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  // ==========================
  // Login
  // ==========================

  const login = useCallback(
    async (credentials) => {
      try {
        dispatch(loginStart());

        const response =
          await authService.login(credentials);

        dispatch(
          loginSuccess({
            user: response.user,
            token: response.token,
          })
        );

        return {
          success: true,
          data: response,
        };
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error.message ||
          "Login failed";

        dispatch(loginFailure(message));

        return {
          success: false,
          message,
        };
      }
    },
    [dispatch]
  );

  // ==========================
  // Logout
  // ==========================

  const logout = useCallback(async () => {
    await authService.logout();

    dispatch(logoutAction());
  }, [dispatch]);

  // ==========================
  // Load User
  // ==========================

  const loadUser = useCallback(async () => {
    const user = await authService.getUser();

    const token =
      await authService.getToken();

    if (user && token) {
      dispatch(
        loginSuccess({
          user,
          token,
        })
      );
    }
  }, [dispatch]);

  // ==========================
  // Update Profile
  // ==========================

  const saveProfile = useCallback(
    async (data) => {
      const response =
        await authService.updateProfile(
          data
        );

      dispatch(updateUser(response));

      return response;
    },
    [dispatch]
  );

  // ==========================
  // Change Password
  // ==========================

  const changePassword =
    async (passwordData) => {
      return await authService.changePassword(
        passwordData
      );
    };

  // ==========================
  // Forgot Password
  // ==========================

  const forgotPassword = async (
    email
  ) => {
    return await authService.forgotPassword(
      email
    );
  };

  // ==========================
  // Reset Password
  // ==========================

  const resetPassword = async (
    token,
    password
  ) => {
    return await authService.resetPassword(
      token,
      password
    );
  };

  // ==========================
  // Clear Error
  // ==========================

  const removeError = () => {
    dispatch(clearError());
  };

  return {
    ...auth,

    login,
    logout,

    loadUser,

    saveProfile,

    changePassword,

    forgotPassword,

    resetPassword,

    clearError: removeError,
  };
};

export default useAuth;