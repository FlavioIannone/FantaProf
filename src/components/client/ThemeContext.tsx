"use client";
import { loadTheme, writeTheme } from "@/lib/ThemeLoader";
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
  const [theme, setTheme] = useState(() => {
    return typeof window !== "undefined" ? loadTheme() : "default";
  });

  const handleSetTheme = (newTheme: string) => {
    writeTheme(newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const loadedTheme = loadTheme();
    document.documentElement.setAttribute("data-theme", loadedTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: handleSetTheme }}>
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
