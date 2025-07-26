"use client";

import { useTheme } from "./ThemeContext";

type Theme = {
  key: string;
  displayText: string;
};

const lightThemes: Theme[] = [
  {
    key: "fantaprof-light",
    displayText: "Chiaro",
  },
  {
    key: "retro",
    displayText: "Retro",
  },
  {
    key: "valentine",
    displayText: "San Valentino",
  },
  {
    key: "lofi",
    displayText: "Lofi",
  },
  {
    key: "garden",
    displayText: "Giardino",
  },
  {
    key: "pastel",
    displayText: "Pastelli",
  },
  {
    key: "fantasy",
    displayText: "Fantastico",
  },
];

const darkThemes: Theme[] = [
  {
    key: "fantaprof-dark",
    displayText: "Scuro",
  },
  {
    key: "dracula",
    displayText: "Dracula",
  },
  {
    key: "synthwave",
    displayText: "Synthwave",
  },
  {
    key: "halloween",
    displayText: "Halloween",
  },
  {
    key: "forest",
    displayText: "Foresta",
  },
  {
    key: "luxury",
    displayText: "Luxury",
  },
  {
    key: "black",
    displayText: "Nero",
  },
  {
    key: "night",
    displayText: "Notte",
  },
  {
    key: "sunset",
    displayText: "Tramonto",
  },
  {
    key: "coffee",
    displayText: "Caffé",
  },
];

export default function ThemeController({
  className,
}: Readonly<{ className?: string }>) {
  const { setTheme } = useTheme();

  const handleDropdownClick = (value: string) => {
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }
    setTheme(value);
  };

  return (
    <div className="d-dropdown d-dropdown-end">
      <div tabIndex={0} role="button" className={`${className} d-btn`}>
        Tema <i className="bi bi-chevron-down" aria-hidden></i>
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
