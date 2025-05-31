import Link from "next/link";
import ReturnToHome from "./ReturnToHome";

export default function Navbar({
  className,
  showReturnToHome,
}: Readonly<{
  className?: string;
  showReturnToHome?: boolean;
}>) {
  return (
    <nav className={`d-navbar bg-base-100 shadow-sm ${className}`}>
      <div className="flex-1">
        <p className="lg:text-2xl md:text-xl text-lg text-primary font-extrabold animate-fade-in-left motion-reduce:animate-none flex items-center">
          {showReturnToHome && <ReturnToHome />}
          <i className="bi bi-book me-1.5"></i>Fanta Prof
        </p>
      </div>
      <div className="flex gap-2">
        <Link href="/auth/signin">
          <button className="group d-btn d-btn-outline lg:d-btn-md lg:text-xl md:text-lg animate-fade-in-right motion-reduce:animate-none">
            <p>Registrazione</p>
          </button>
        </Link>
        <Link href="/auth/login">
          <button className="group d-btn d-btn-primary lg:d-btn-md lg:text-xl md:text-lg animate-fade-in-right motion-reduce:animate-none">
            <p>Login</p>
            <i
              className="bi bi-arrow-right-short transform transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            ></i>
          </button>
        </Link>
      </div>
    </nav>
  );
}
