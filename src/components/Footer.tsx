export default function Footer({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <footer
      className={`footer md:flex sm:footer-horizontal bg-base-200  py-10 ${className}`}
    >
      <aside>
        <p className="d-footer-title lg:text-2xl md:text-xl sm:text-lg text-primary">
          {/*TODO: Inserire icona del sito */}Fanta Prof
        </p>
        <p className="lg:text-xl md:text-lg">
          Sito sviluppato con amore dal team di Fanta Prof
        </p>
        <p className="lg:text-xl md:text-lg bi bi-c-circle">
          Copyright 2024-2025
        </p>
      </aside>
      <div className="md:ms-5 ms-0">
        <p className="d-footer-title lg:text-2xl md:text-xl sm:text-lg text-primary">
          Licenze
        </p>
        <p className="lg:text-xl md:text-lg">
          Puoi trovare le licenze nella repository{" "}
          <a
            href="https://github.com"
            target="blank"
            className="d-btn-link text-primary"
          >
            GitHub
          </a>
          {/*TODO: Aggiungere repo di GitHub*/}
        </p>
      </div>
    </footer>
  );
}
