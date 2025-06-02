import Link from "next/link";

export default function ReturnToHome({
  className,
  text,
}: Readonly<{ className?: string; text?: string }>) {
  return (
    <Link href="/" className={className} aria-label="Torna alla home">
      <div className="d-btn d-btn-ghost text-xl flex gap-1 p-0 justify-center items-center">
        <i className="bi bi-arrow-left-short text-4xl" aria-hidden="true"></i>
        <p className={`${text && "me-1.5"}`}>{text}</p>
      </div>
    </Link>
  );
}
