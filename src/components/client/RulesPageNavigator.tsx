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
      {/** Team Creation */}
      <li>
        <Link
          href="/rules/team-creation"
          onClick={() => {
            handleClick();
          }}
          className={`motion-safe:opacity-0 motion-reduce:animate-none animate-fade-in-left animation-delay-100 ${
            pathname === "/rules/team-creation" && "d-menu-active"
          }`}
        >
          <p className="w-max">Composizione della squadra</p>
        </Link>
      </li>
      {/** Bonus Malus */}
      <li>
        <Link
          href="/rules/bonus-malus"
          onClick={() => {
            handleClick();
          }}
          className={`motion-safe:opacity-0 motion-reduce:animate-none animate-fade-in-left animation-delay-200 ${
            pathname === "/rules/bonus-malus" && "d-menu-active"
          }`}
        >
          <p className="w-max">Punteggi: Bonus e Malus</p>
        </Link>
      </li>
      {/** Personalization */}
      <li>
        <Link
          href="/rules/personalization"
          onClick={() => {
            handleClick();
          }}
          className={`motion-safe:opacity-0 motion-reduce:animate-none animate-fade-in-left animation-delay-300 ${
            pathname === "/rules/personalization" && "d-menu-active"
          }`}
        >
          <p className="w-max">Personalizzazione</p>
        </Link>
      </li>
      {/** Starting Game */}
      <li>
        <Link
          href="/rules/starting-game"
          onClick={() => {
            handleClick();
          }}
          className={`motion-safe:opacity-0 motion-reduce:animate-none animate-fade-in-left animation-delay-400 ${
            pathname === "/rules/starting-game" ? "d-menu-active" : ""
          }`}
        >
          <p className="w-max">Inizio del Gioco</p>
        </Link>
      </li>
      {/** Site Explaination */}
      <li>
        <Link
          href="/rules/site-explaination"
          onClick={() => {
            handleClick();
          }}
          className={`motion-safe:opacity-0 motion-reduce:animate-none animate-fade-in-left animation-delay-500 ${
            pathname === "/rules/site-explaination" ? "d-menu-active" : ""
          }`}
        >
          <p className="w-max">Funzionamento Sito</p>
        </Link>
      </li>
    </ul>
  );
}
