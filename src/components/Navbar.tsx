import Link from "next/link";

export default function Navbar({
  className,
}: Readonly<{
  className?: string;
}>) {
  return (
    <nav className={`d-navbar bg-base-100 shadow-sm ${className}`}>
      <div className="flex-1">
        <p className="lg:text-2xl md:text-xl text-lg text-primary font-extrabold animate-fade-in-left motion-reduce:animate-none">
          <i className="bi bi-book"></i> Fanta Prof
        </p>
      </div>
      <div className="flex-none">
        <Link href="/auth/login" className="">
          <button className="group d-btn d-btn-primary lg:d-btn-lg  lg:text-2xl md:text-xl text-lg animate-fade-in-right motion-reduce:animate-none">
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
