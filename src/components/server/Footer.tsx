import { licenses } from "@/lib/types";
import Link from "next/link";
import CookieConsentModal from "../client/cookies/CookieConsentModal";
import CookieSettingsOpener from "../client/cookies/CookieSettingsOpener";

export default function Footer({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <footer
      className={`bg-base-200 text-base-content border-t border-base-300 px-6 py-10 md:py-14 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
        {/* Brand Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <i className="bi bi-book text-primary"></i> Fanta Prof
          </h2>
          <p className="text-base leading-relaxed">
            Sito sviluppato con amore dal team di Fanta Prof.
          </p>
          <p className="mt-3 text-sm opacity-80">
            <i className="bi bi-c-circle mr-1"></i> Copyright 2024–2025
          </p>
        </section>

        {/* Licenses Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Licenze</h2>
          <ul className="space-y-2">
            {licenses.map((license, index) => (
              <li key={index} className="text-base">
                Licenza di {license.name}{" "}
                <Link href={license.link} className="d-link">
                  qui
                </Link>
              </li>
            ))}
            <li className="italic text-base">
              Immagini realizzate da{" "}
              <Link href="https://www.freepik.com/" className="d-link">
                Freepik
              </Link>
            </li>
          </ul>
        </section>

        {/* Privacy Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Privacy</h2>
          <p className="text-base leading-relaxed">
            Per maggiori informazioni, consulta la nostra{" "}
            <Link href="/privacy" className="d-link font-semibold">
              Informativa sulla privacy
            </Link>
            .
          </p>
          <p className="mt-2 text-base leading-relaxed">
            Leggi anche le{" "}
            <Link href="/terms" className="d-link font-semibold">
              Condizioni d'uso
            </Link>{" "}
            e la{" "}
            <Link href="/cookie-policy" className="d-link font-semibold">
              Cookie Policy
            </Link>
            .
          </p>
          <CookieSettingsOpener />
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contatti</h2>
          <p className="text-base leading-relaxed">
            Per domande o supporto, scrivici a{" "}
            <Link
              href="mailto:w.iannone.flavio@gmail.com"
              className="d-link font-semibold"
            >
              w.iannone.flavio@gmail.com
            </Link>
            .
          </p>
          <p className="mt-3 text-base leading-relaxed">
            Oppure visita la nostra pagina{" "}
            <Link href="/contact" className="d-link font-semibold">
              Contatti
            </Link>
            .
          </p>
        </section>
      </div>

      <div className="mt-10 border-t border-base-300 pt-6 text-center text-sm opacity-70">
        Ultimo aggiornamento: Ottobre 2025
      </div>
    </footer>
  );
}
