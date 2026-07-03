import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  loginService,
  saveToken,
  logoutService,
} from "../../src/services/login.service";

export default function useLogin() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const login = async (
    credentials
  ) => {

    try {

      setLoading(true);

      setError("");

      const result =
        await loginService(
          credentials
        );

      if (
        !result.success
      ) {

        throw new Error(
          result.message
        );

      }

      saveToken(
        result.data.token
      );

      navigate(
        "/dashboard"
      );

      return {
        success: true,
      };

    }

    catch (error) {

      setError(
        error.message
      );

      return {
        success: false,
      };

    }

    finally {

      setLoading(false);

    }

  };

  const logout = () => {

    logoutService();

    navigate(
      "/login"
    );

  };

  return {
    login,
    logout,
    loading,
    error,
  };
}