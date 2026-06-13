import React, { createContext, useContext, useMemo, useState } from "react";
import { darkColors, lightColors } from "../styles/colors";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const value = useMemo(
    () => ({
      darkMode,
      colors: darkMode ? darkColors : lightColors,
      toggleDarkMode: () => setDarkMode((current) => !current)
    }),
    [darkMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
