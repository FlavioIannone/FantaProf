"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import { themes } from "./ThemeController";

export default function ThemeDisplayer({ className }: { className?: string }) {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient)
    return (
      <div className="d-skeleton">
        <p className="invisible">Tema</p>
      </div>
    );

  return (
    <p className={className}>
      {themes.find((value) => value.key === theme)?.displayText ??
        "Tema sconosciuto"}
    </p>
  );
}
