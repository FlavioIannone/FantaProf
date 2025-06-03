"use client";

import { useTheme } from "./ThemeContext";

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
        Tema <i className="bi bi-chevron-down"></i>
      </div>
      <ul className="d-dropdown-content d-menu z-50 rounded-box lg:w-max flex-nowrap h-[25rem] overflow-y-auto bg-base-200 mt-4">
        <li className="d-menu-title">Temi</li>
        <li onClick={() => handleDropdownClick("default")}>
          <p className="text-nowrap">Predefinito</p>
        </li>
        {/*Chiari */}
        <li className="d-menu-title">Temi chiari</li>
        <li onClick={() => handleDropdownClick("fantaprof-light")}>
          <p className="text-nowrap">Fantaprof Chiaro</p>
        </li>
        <li onClick={() => handleDropdownClick("light")}>
          <p className="text-nowrap">Chiaro</p>
        </li>
        <li onClick={() => handleDropdownClick("retro")}>
          <p className="text-nowrap">Retro</p>
        </li>
        <li onClick={() => handleDropdownClick("valentine")}>
          <p className="text-nowrap">San Valentino</p>
        </li>
        <li onClick={() => handleDropdownClick("lofi")}>
          <p className="text-nowrap">Lofi</p>
        </li>
        <li onClick={() => handleDropdownClick("garden")}>
          <p className="text-nowrap">Giardino</p>
        </li>
        <li onClick={() => handleDropdownClick("pastel")}>
          <p className="text-nowrap">Pastelli</p>
        </li>
        <li onClick={() => handleDropdownClick("fantasy")}>
          <p className="text-nowrap">Fantastico</p>
        </li>
        {/*Scuri */}
        <li className="d-menu-title">Temi scuri</li>
        <li onClick={() => handleDropdownClick("dark")}>
          <p className="text-nowrap">Scuro</p>
        </li>
        <li onClick={() => handleDropdownClick("dracula")}>
          <p className="text-nowrap">Dracula</p>
        </li>
        <li onClick={() => handleDropdownClick("synthwave")}>
          <p className="text-nowrap">Synthwave</p>
        </li>
        <li onClick={() => handleDropdownClick("halloween")}>
          <p className="text-nowrap">Halloween</p>
        </li>
        <li onClick={() => handleDropdownClick("forest")}>
          <p className="text-nowrap">Foresta</p>
        </li>
        <li onClick={() => handleDropdownClick("luxury")}>
          <p className="text-nowrap">Luxury</p>
        </li>
        <li onClick={() => handleDropdownClick("black")}>
          <p className="text-nowrap">Nero</p>
        </li>
        <li onClick={() => handleDropdownClick("night")}>
          <p className="text-nowrap">Notte</p>
        </li>
        <li onClick={() => handleDropdownClick("sunset")}>
          <p className="text-nowrap">Tramonto</p>
        </li>
        <li onClick={() => handleDropdownClick("coffee")}>
          <p className="text-nowrap">Caffé</p>
        </li>
      </ul>
    </div>
  );
}
