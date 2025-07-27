"use client";
import { loadThemeFromCookies, writeThemeFromCookies } from "@/lib/themeLoader";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContextType = {
  theme: string;
  setTheme: (value: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [theme, setTheme] = useState("default");

  // Load theme from cookies on initial mount
  useEffect(() => {
    const load = async () => {
      const cookieTheme = loadThemeFromCookies();
      if (cookieTheme) {
        setTheme(cookieTheme);
        document.documentElement.setAttribute("data-theme", cookieTheme);
      }
    };
    load();
  }, []);

  // Update cookie and HTML attribute when theme changes
  useEffect(() => {
    writeThemeFromCookies(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSetTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeContext, ThemeProvider, useTheme };
