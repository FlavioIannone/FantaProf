"use client";

import { useTheme } from "@/components/client/Theme/ThemeContext";
import {
  darkThemes,
  lightThemes,
} from "@/components/client/Theme/ThemeController";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const currentTheme = themes.find((value) => value.key === theme);
    setActiveImage(
      currentTheme?.imageUrl ?? "/auth_images/auth_image_pink_500.webp"
    );
  }, [theme]);

  if (!activeImage) return <div className="w-full h-full d-skeleton"></div>;

  return (
    <Image
      src={activeImage}
      alt="Login image"
      width={3272}
      height={5802}
      className="shadow rounded-xl w-full h-full object-cover object-top-left"
      priority
    />
  );
}
