import { licenses } from "@/lib/types";
import Link from "next/link";

export default function Footer({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <footer
      className={`footer flex md:flex-row flex-col justify-center sm:footer-horizontal bg-base-200 md:space-x-5 space-x-0 md:space-y-0 space-y-5 py-10 ${className}`}
    >
      <section>
        <p className="d-footer-title lg:text-2xl md:text-xl sm:text-lg">
          <i className="bi bi-book" aria-hidden></i> Fanta Prof
        </p>
        <p className="lg:text-xl md:text-lg">
          Sito sviluppato con amore dal team di Fanta Prof
        </p>
        <i className="lg:text-xl md:text-lg bi bi-c-circle">
          Copyright 2024-2025
        </i>
      </section>
      <section className="md:ms-5 ms-0">
        <p className="d-footer-title lg:text-2xl md:text-xl sm:text-lg">
          Licenze
        </p>
        <div className="space-x-1.5">
          {licenses.map((license, index) => (
            <p className="lg:text-lg md:text-md" key={index}>
              Trovi la licenza di {license.name}{" "}
              <Link className="d-link" href={license.link}>
                qui
              </Link>
            </p>
          ))}
          <p className="lg:text-lg md:text-md italic">
            Images designed by{" "}
            <Link className="d-link" href="https://www.freepik.com/">
              Freepik
            </Link>
          </p>
        </div>
      </section>
    </footer>
  );
}
