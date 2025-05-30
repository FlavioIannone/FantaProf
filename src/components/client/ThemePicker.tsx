"use client";

import { useEffect, useState } from "react";

export default function ThemePicker() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  });

  return (
    <button
      className="d-btn d-btn-primary"
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Toggle
    </button>
  );
}
