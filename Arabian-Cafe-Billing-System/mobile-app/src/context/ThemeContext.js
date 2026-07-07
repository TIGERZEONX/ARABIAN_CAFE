import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Theme from "../styles/theme";

export const ThemeContext = createContext();

const STORAGE_KEY = "APP_THEME";

const lightColors = Theme.colors;

const darkColors = {
  primary: "#C8A165",
  secondary: "#A1887F",

  background: "#121212",
  surface: "#1E1E1E",
  card: "#252525",

  text: "#FFFFFF",
  textSecondary: "#BDBDBD",

  success: "#4CAF50",
  danger: "#F44336",
  warning: "#FF9800",

  border: "#424242",

  lightCoffee: "#3A3A3A",
};

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] =
    useState("light");

  // ======================================
  // Load Theme
  // ======================================

  const loadTheme = useCallback(async () => {
    try {
      const savedTheme =
        await AsyncStorage.getItem(
          STORAGE_KEY
        );

      if (savedTheme) {
        setThemeMode(savedTheme);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // ======================================
  // Save Theme
  // ======================================

  const saveTheme = async (mode) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        mode
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ======================================
  // Light Theme
  // ======================================

  const setLightTheme =
    useCallback(async () => {
      setThemeMode("light");

      await saveTheme("light");
    }, []);

  // ======================================
  // Dark Theme
  // ======================================

  const setDarkTheme =
    useCallback(async () => {
      setThemeMode("dark");

      await saveTheme("dark");
    }, []);

  // ======================================
  // Toggle Theme
  // ======================================

  const toggleTheme =
    useCallback(async () => {
      if (themeMode === "light") {
        setThemeMode("dark");

        await saveTheme("dark");
      } else {
        setThemeMode("light");

        await saveTheme("light");
      }
    }, [themeMode]);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  // ======================================
  // Current Theme
  // ======================================

  const theme = useMemo(() => {
    return {
      ...Theme,

      colors:
        themeMode === "dark"
          ? darkColors
          : lightColors,
    };
  }, [themeMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,

        themeMode,

        isDark:
          themeMode === "dark",

        colors: theme.colors,

        typography:
          theme.typography,

        spacing:
          theme.spacing,

        borderRadius:
          theme.borderRadius,

        shadows:
          theme.shadows,

        loadTheme,

        setLightTheme,

        setDarkTheme,

        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};