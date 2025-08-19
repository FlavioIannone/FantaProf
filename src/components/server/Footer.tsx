import Link from "next/link";

export default function Footer({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <footer
      className={`footer md:flex sm:footer-horizontal bg-base-200 space-x-5  py-10 ${className}`}
    >
      <aside>
        <p className="d-footer-title lg:text-2xl md:text-xl sm:text-lg">
          <i className="bi bi-book" aria-hidden></i> Fanta Prof
        </p>
        <p className="lg:text-xl md:text-lg">
          Sito sviluppato con amore dal team di Fanta Prof
        </p>
        <i className="lg:text-xl md:text-lg bi bi-c-circle">
          Copyright 2024-2025
        </i>
      </aside>
      <div className="md:ms-5 ms-0">
        <p className="d-footer-title lg:text-2xl md:text-xl sm:text-lg">
          Licenze
        </p>
        <p className="lg:text-xl md:text-lg">
          Puoi trovare la licenza nella repository{" "}
          <a href="https://github.com" target="blank" className="d-btn-link">
            GitHub
          </a>
        </p>
        <p className="lg:text-lg md:text-md italic">
          Designed by{" "}
          <Link className="d-link" href="https://www.freepik.com/">
            Freepik
          </Link>
        </p>
      </div>
    </footer>
  );
}
