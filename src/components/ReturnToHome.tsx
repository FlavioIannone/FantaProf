import Link from "next/link";

export default function ReturnToHome() {
  return (
    <Link href="/">
      <button
        type="button"
        className="d-btn d-btn-ghost text-xl flex gap-1 p-0 justify-center items-center "
      >
        <i className="bi bi-arrow-left-short text-4xl" aria-hidden="true"></i>
      </button>
    </Link>
  );
}
