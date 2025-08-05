import Link from "next/link";

export default function DashboardNavbar({
  className,
  fixed,
}: {
  className?: string;
  fixed?: boolean;
}) {
  return (
    <>
      <nav
        className={`${className} ${
          fixed && "fixed z-50"
        } d-navbar bg-base-100 border-0 border-base-300 border-b`}
      >
        <div className="w-full text-primary lg:text-3xl md:text-2xl sm:text-2xl text-2xl flex items-center justify-between">
          <div className="flex items-center justify-center">
            <i className="bi bi-book me-1.5" aria-hidden></i>
            FantaProf
          </div>
          {/* <label
          htmlFor="dashboard-drawer"
          role="button"
          className="lg:hidden block"
          >
          <i className="bi bi-list text-2xl" aria-hidden></i>
          </label> */}
          <Link href="/settings">
            <i className="bi bi-three-dots text-2xl" aria-hidden></i>
          </Link>
        </div>
      </nav>
      {fixed && (
        <nav
          className={`${className} invisible d-navbar bg-base-100 border-0 border-base-300 border-b`}
        >
          <div className="w-full text-primary lg:text-3xl md:text-2xl sm:text-2xl text-2xl flex items-center justify-between">
            <div className="flex items-center justify-center">
              <i className="bi bi-book me-1.5" aria-hidden></i>
              FantaProf
            </div>
            {/* <label
          htmlFor="dashboard-drawer"
          role="button"
          className="lg:hidden block"
        >
          <i className="bi bi-list text-2xl" aria-hidden></i>
        </label> */}
            <Link href="settings">
              <i className="bi bi-three-dots text-2xl" aria-hidden></i>
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}
