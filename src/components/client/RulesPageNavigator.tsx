"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RulesPageNavigator() {
  const pathname = usePathname();
  const handleClick = () => {
    const drawer = document.getElementById("rules-drawer") as HTMLInputElement;
    drawer.checked = false;
  };

  return (
    <ul className="d-menu flex flex-col gap-2">
      <Link
        href="/rules/team-creation"
        onClick={() => {
          handleClick();
        }}
        className="opacity-0 motion-reduce:animate-none animate-fade-in-left animation-delay-100"
      >
        <li>
          <p
            className={`text-nowrap w-full ${
              pathname === "/rules/team-creation" && "d-menu-active"
            }`}
          >
            Composizione della squadra
          </p>
        </li>
      </Link>
      <Link
        href="/rules/bonus-malus"
        onClick={() => {
          handleClick();
        }}
        className="opacity-0 motion-reduce:animate-none animate-fade-in-left animation-delay-200"
      >
        <li>
          <p
            className={`text-nowrap w-full ${
              pathname === "/rules/bonus-malus" && "d-menu-active"
            }`}
          >
            Punteggi: Bonus e Malus
          </p>
        </li>
      </Link>
      <Link
        href="/rules/personalization"
        onClick={() => {
          handleClick();
        }}
        className="opacity-0 motion-reduce:animate-none animate-fade-in-left animation-delay-300"
      >
        <li>
          <p
            className={`text-nowrap w-full ${
              pathname === "/rules/personalization" && "d-menu-active"
            }`}
          >
            Personalizzazione
          </p>
        </li>
      </Link>
      <Link
        href="/rules/starting-game"
        onClick={() => {
          handleClick();
        }}
        className="opacity-0 motion-reduce:animate-none animate-fade-in-left animation-delay-400"
      >
        <li>
          <p
            className={`w-full text-nowrap ${
              pathname === "/rules/starting-game" ? "d-menu-active" : ""
            }`}
          >
            Inizio del Gioco
          </p>
        </li>
      </Link>
      <Link
        href="/rules/site-explaination"
        onClick={() => {
          handleClick();
        }}
        className="opacity-0 motion-reduce:animate-none animate-fade-in-left animation-delay-500"
      >
        <li>
          <p
            className={`w-full text-nowrap ${
              pathname === "/rules/site-explaination" ? "d-menu-active" : ""
            }`}
          >
            Funzionamento Sito
          </p>
        </li>
      </Link>
    </ul>
  );
}
