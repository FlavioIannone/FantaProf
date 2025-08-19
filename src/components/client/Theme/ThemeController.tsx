"use client";

import { useTheme } from "./ThemeContext";

type Theme = {
  key: string;
  displayText: string;
  imageUrl: string;
};

export const lightThemes: Theme[] = [
  {
    key: "retro",
    displayText: "Retro",
    imageUrl: "/auth_images/auth_image_red_300.webp",
  },
  {
    key: "valentine",
    displayText: "San Valentino",
    imageUrl: "/auth_images/auth_image_pink_500.webp",
  },
  {
    key: "lofi",
    displayText: "Lofi",
    imageUrl: "/auth_images/auth_image_black.webp",
  },
  {
    key: "garden",
    displayText: "Giardino",
    imageUrl: "/auth_images/auth_image_fucsia.webp",
  },
  {
    key: "pastel",
    displayText: "Pastelli",
    imageUrl: "/auth_images/auth_image_pink_200.webp",
  },
  {
    key: "fantasy",
    displayText: "Fantastico",
    imageUrl: "/auth_images/auth_image_purple.webp",
  },
];

export const darkThemes: Theme[] = [
  {
    key: "dracula",
    displayText: "Dracula",
    imageUrl: "/auth_images/auth_image_pink_500.webp",
  },
  {
    key: "synthwave",
    displayText: "Synthwave",
    imageUrl: "/auth_images/auth_image_pink_500.webp",
  },
  {
    key: "halloween",
    displayText: "Halloween",
    imageUrl: "/auth_images/auth_image_orange.webp",
  },
  {
    key: "forest",
    displayText: "Foresta",
    imageUrl: "/auth_images/auth_image_green.webp",
  },
  {
    key: "luxury",
    displayText: "Luxury",
    imageUrl: "/auth_images/auth_image_white.webp",
  },
  {
    key: "black",
    displayText: "Nero",
    imageUrl: "/auth_images/auth_image_black.webp",
  },
  {
    key: "night",
    displayText: "Notte",
    imageUrl: "/auth_images/auth_image_sky.webp",
  },
  {
    key: "sunset",
    displayText: "Tramonto",
    imageUrl: "/auth_images/auth_image_orange.webp",
  },
  {
    key: "coffee",
    displayText: "Caffé",
    imageUrl: "/auth_images/auth_image_orange.webp",
  },
];

// Theme definitions including default
export const themes = [
  {
    key: "default",
    displayText: "Predefinito",
    imageUrl: "/auth_images/auth_image_blue.webp",
  },
  ...lightThemes,
  ...darkThemes,
];

export default function ThemeController({
  className,
}: Readonly<{ className?: string }>) {
  const { theme, setTheme, loading } = useTheme();

  const handleDropdownClick = (value: string) => {
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }
    if (theme === value) return;
    setTheme(value);
  };

  if (loading) {
    return (
      <button
        tabIndex={0}
        type="button"
        disabled
        aria-disabled
        className={`${className} d-btn d-skeleton`}
      >
        Tema <i className="bi bi-chevron-down" aria-hidden></i>
      </button>
    );
  }

  return (
    <div className="d-dropdown d-dropdown-end">
      <div tabIndex={0} role="button" className={`${className} d-btn`}>
        {themes.find((value) => theme === value.key)?.displayText ?? "Tema"}{" "}
        <i className="bi bi-chevron-down" aria-hidden></i>
      </div>
      <ul
        tabIndex={0}
        className="d-dropdown-content d-menu z-50 rounded-box lg:w-max flex-nowrap h-[25rem] overflow-y-auto bg-base-200 mt-4"
      >
        <li className="d-menu-title">Temi</li>
        <li onClick={() => handleDropdownClick("default")}>
          <p className="text-nowrap">Predefinito</p>
        </li>
        {/*Chiari */}
        <li className="d-menu-title">Temi chiari</li>
        {lightThemes.map((theme) => (
          <li key={theme.key} onClick={() => handleDropdownClick(theme.key)}>
            <p className="text-nowrap">{theme.displayText}</p>
          </li>
        ))}

        {/*Scuri */}
        <li className="d-menu-title">Temi scuri</li>
        {darkThemes.map((theme) => (
          <li key={theme.key} onClick={() => handleDropdownClick(theme.key)}>
            <p className="text-nowrap">{theme.displayText}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
