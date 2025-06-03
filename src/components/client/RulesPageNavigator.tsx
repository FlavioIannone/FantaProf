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
    <ul className="d-menu space-y-2.5">
      <li>
        <Link
          href="/rules/team-creation"
          onClick={() => {
            handleClick();
          }}
          className="motion-safe:opacity-0 motion-reduce:animate-none animate-fade-in-left animation-delay-100"
        >
          <p
            className={`text-nowrap w-full ${
              pathname === "/rules/team-creation" && "d-menu-active"
            }`}
          >
            Composizione della squadra
          </p>
        </Link>
      </li>
      <li>
        <Link
          href="/rules/bonus-malus"
          onClick={() => {
            handleClick();
          }}
          className="motion-safe:opacity-0 motion-reduce:animate-none animate-fade-in-left animation-delay-200"
        >
          <p
            className={`text-nowrap w-full ${
              pathname === "/rules/bonus-malus" && "d-menu-active"
            }`}
          >
            Punteggi: Bonus e Malus
          </p>
        </Link>
      </li>
      <li>
        <Link
          href="/rules/personalization"
          onClick={() => {
            handleClick();
          }}
          className="motion-safe:opacity-0 motion-reduce:animate-none animate-fade-in-left animation-delay-300"
        >
          <p
            className={`text-nowrap w-full ${
              pathname === "/rules/personalization" && "d-menu-active"
            }`}
          >
            Personalizzazione
          </p>
        </Link>
      </li>
      <li>
        <Link
          href="/rules/starting-game"
          onClick={() => {
            handleClick();
          }}
          className="motion-safe:opacity-0 motion-reduce:animate-none animate-fade-in-left animation-delay-400"
        >
          <p
            className={`w-full text-nowrap ${
              pathname === "/rules/starting-game" ? "d-menu-active" : ""
            }`}
          >
            Inizio del Gioco
          </p>
        </Link>
      </li>
      <li>
        <Link
          href="/rules/site-explaination"
          onClick={() => {
            handleClick();
          }}
          className="motion-safe:opacity-0 motion-reduce:animate-none animate-fade-in-left animation-delay-500"
        >
          <p
            className={`w-full text-nowrap ${
              pathname === "/rules/site-explaination" ? "d-menu-active" : ""
            }`}
          >
            Funzionamento Sito
          </p>
        </Link>
      </li>
    </ul>
  );
}
