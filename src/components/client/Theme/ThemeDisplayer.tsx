"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

export default function ThemeDisplayer({ className }: { className?: string }) {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    console.log(theme);
    setIsClient(true);
  }, []);

  // Returns the theme name expressed in a more user-friendly format
  const themeToBetterString = (theme: string) => {
    switch (theme) {
      case "fantaprof-light":
        return "Fantaprof Chiaro";
      case "fantaprof-dark":
        return "Fantaprof Scuro";
      case "light":
        return "Chiaro";
      case "retro":
        return "Retro";
      case "valentine":
        return "San Valentino";
      case "lofi":
        return "Lofi";
      case "garden":
        return "Giardino";
      case "pastel":
        return "Pastelli";
      case "fantasy":
        return "Fantastico";
      case "dark":
        return "Scuro";
      case "dracula":
        return "Dracula";
      case "synthwave":
        return "Synthwave";
      case "halloween":
        return "Halloween";
      case "forest":
        return "Foresta";
      case "luxury":
        return "Luxury";
      case "black":
        return "Nero";
      case "night":
        return "Notte";
      case "sunset":
        return "Tramonto";
      case "coffee":
        return "Caffé";
      case "default":
        return "Predefinito";
    }
  };

  if (!isClient)
    return (
      <div className="d-skeleton">
        <p className="invisible">Tema</p>
      </div>
    );

  return <p className={className}>{themeToBetterString(theme)}</p>;
}
