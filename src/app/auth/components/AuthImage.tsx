"use client";

import { useTheme } from "@/components/client/Theme/ThemeContext";
import {
  darkThemes,
  lightThemes,
} from "@/components/client/Theme/ThemeController";
import Image from "next/image";
import { useEffect, useState } from "react";

// Theme definitions including default
const themes = [
  {
    key: "default",
    displayText: "Predefinito",
    imageUrl: "/auth_images/auth_image_blue.webp",
  },
  ...lightThemes,
  ...darkThemes,
];

export default function AuthImage() {
  const { theme } = useTheme();
  const [activeImage, setActiveImage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // Update image based on selected theme
  useEffect(() => {
    const currentTheme = themes.find((value) => value.key === theme);
    setActiveImage(
      currentTheme?.imageUrl ?? "/auth_images/auth_image_pink_500.webp"
    );
    setIsLoading(true); // Reset loading state when theme changes
  }, [theme]);

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 w-full h-full d-skeleton bg-neutral/10 rounded-xl" />
      )}
      {activeImage && (
        <Image
          src={activeImage}
          alt="Login image"
          width={3272}
          height={5802}
          className={`shadow rounded-xl w-full h-full object-cover object-top-left transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          priority
          loading="eager"
          onLoadingComplete={() => setIsLoading(false)}
        />
      )}
    </div>
  );
}
