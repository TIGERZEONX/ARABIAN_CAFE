import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  // ======================================
  // Load Authentication
  // ======================================

  const loadAuth = useCallback(async () => {
    try {
      setLoading(true);

      const savedToken =
        await authService.getToken();

      const savedUser =
        await authService.getUser();

      if (savedToken && savedUser) {
        setToken(savedToken);

        setUser(savedUser);

        setIsAuthenticated(true);
      } else {
        setToken(null);

        setUser(null);

        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);

      setToken(null);

      setUser(null);

      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // ======================================
  // Login
  // ======================================

  const login = async (credentials) => {
    const response =
      await authService.login(credentials);

    setToken(response.token);

    setUser(response.user);

    setIsAuthenticated(true);

    return response;
  };

  // ======================================
  // Logout
  // ======================================

  const logout = async () => {
    await authService.logout();

    setToken(null);

    setUser(null);

    setIsAuthenticated(false);
  };

  // ======================================
  // Update User
  // ======================================

  const updateProfile = async (
    profile
  ) => {
    const response =
      await authService.updateProfile(
        profile
      );

    setUser(response);

    return response;
  };

  // ======================================
  // Refresh User
  // ======================================

  const refreshProfile =
    async () => {
      const profile =
        await authService.getProfile();

      setUser(profile);

      return profile;
    };

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,

        token,

        loading,

        isAuthenticated,

        login,

        logout,

        updateProfile,

        refreshProfile,

        loadAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};