import Link from "next/link";
import ReturnToHome from "./BackToPathArrow";
import ThemeController from "../client/Theme/ThemeController";

export default function Navbar({
  className,
  showReturnToHome,
  showDrawerButton,
  hideLogoOnSmallBrP,
}: Readonly<{
  className?: string;
  showDrawerButton?: boolean;
  showReturnToHome?: boolean;
  hideLogoOnSmallBrP?: boolean;
}>) {
  return (
    <>
      <nav className={`d-navbar bg-base-100 shadow-sm ${className} fixed z-50`}>
        <div className="flex-1">
          <div className="lg:text-2xl md:text-xl text-lg text-primary font-extrabold animate-fade-in-left motion-reduce:animate-none w-fit flex items-center">
            {showReturnToHome && (
              <ReturnToHome
                className={`${hideLogoOnSmallBrP && "sm:block hidden"}`}
              />
            )}
            {showDrawerButton && (
              <label
                htmlFor="rules-drawer"
                aria-label="open sidebar"
                className="d-btn d-btn-square d-btn-ghost flex-none sm:hidden me-1.5"
              >
                <i className="bi bi-list text-2xl" aria-hidden></i>
              </label>
            )}
            <div className={`${hideLogoOnSmallBrP && "sm:block hidden"}`}>
              <i className="bi bi-book me-1.5" aria-hidden></i>Fanta Prof
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <ThemeController className="motion-safe:opacity-0 animate-fade-in-right motion-reduce:animate-none" />
          <Link href="/auth/signin" className="sm:block hidden">
            <button className="group d-btn d-btn-outline lg:d-btn-md lg:text-xl md:text-lg animate-fade-in-right motion-reduce:animate-none animation-delay-100">
              <p>Registrazione</p>
            </button>
          </Link>
          <Link href="/auth/login">
            <button className="group d-btn d-btn-primary lg:d-btn-md lg:text-xl md:text-lg animate-fade-in-right motion-reduce:animate-none animation-delay-200">
              <p>Login</p>
              <i
                className="bi bi-arrow-right-short transform transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              ></i>
            </button>
          </Link>
        </div>
      </nav>
      {/**Invisible Nav to make it occupy the right amount of space while having the real nav fixed */}
      <nav
        className={`d-navbar bg-base-100 shadow-sm ${className} invisible`}
        aria-hidden
      >
        <div className="flex-1">
          <div className="lg:text-2xl md:text-xl text-lg text-primary font-extrabold animate-fade-in-left motion-reduce:animate-none flex items-center">
            {showReturnToHome && <ReturnToHome className="sm:block hidden" />}
            {showDrawerButton && (
              <label
                htmlFor="rules-drawer"
                aria-label="open sidebar"
                className="d-btn d-btn-square d-btn-ghost flex-none sm:hidden me-1.5"
              >
                <i className="bi bi-list text-2xl" aria-hidden></i>
              </label>
            )}
            <div className={`${hideLogoOnSmallBrP && "sm:block hidden"}`}>
              <i className="bi bi-book me-1.5" aria-hidden></i>Fanta Prof
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <ThemeController className="motion-safe:opacity-0 animate-fade-in-right motion-reduce:animate-none" />
          <Link href="/auth/signin" className="sm:block hidden">
            <button className="group d-btn d-btn-outline lg:d-btn-md lg:text-xl md:text-lg animate-fade-in-right motion-reduce:animate-none animation-delay-100">
              <p>Registrazione</p>
            </button>
          </Link>
          <Link href="/auth/login">
            <button className="group d-btn d-btn-primary lg:d-btn-md lg:text-xl md:text-lg animate-fade-in-right motion-reduce:animate-none animation-delay-200">
              <p>Login</p>
              <i
                className="bi bi-arrow-right-short transform transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              ></i>
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}
