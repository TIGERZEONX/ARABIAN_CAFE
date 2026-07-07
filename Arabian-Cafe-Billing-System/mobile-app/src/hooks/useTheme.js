import { useContext, useEffect } from "react";

import { ThemeContext } from "../context/ThemeContext";

const useTheme = () => {
  const {
    theme,
    themeMode,

    isDark,

    setLightTheme,
    setDarkTheme,
    toggleTheme,

    colors,
    typography,
    spacing,
    borderRadius,
    shadows,

    loadTheme,
  } = useContext(ThemeContext);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  return {
    // Theme
    theme,
    themeMode,
    isDark,

    // Actions
    setLightTheme,
    setDarkTheme,
    toggleTheme,

    // Design System
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
  };
};

export default useTheme;