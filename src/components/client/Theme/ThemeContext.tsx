"use client";
import { loadThemeFromCookies, writeThemeFromCookies } from "@/lib/theme-loader";
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
  loading: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [theme, setTheme] = useState("default");
  const [loading, setLoading] = useState(true);

  // Load theme from cookies on initial mount
  useEffect(() => {
    const load = () => {
      setLoading(true);
      const cookieTheme = loadThemeFromCookies();
      if (cookieTheme) {
        setTheme(cookieTheme);
      }
      setLoading(false);
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
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, loading }}>
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
