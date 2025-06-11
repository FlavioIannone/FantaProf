export default function DashboardNavbar() {
  return (
    <nav className="d-navbar bg-base-100 shadow-sm md:hidden">
      <div className="text-primary lg:text-3xl md:text-2xl sm:text-xl flex items-center">
        <i className="bi bi-book me-1.5 lg:block hidden" aria-hidden></i>
        <label
          htmlFor="dashboard-drawer"
          role="button"
          className="lg:hidden block"
        >
          <i className="bi bi-list text-2xl" aria-hidden></i>
        </label>
        FantaProf
      </div>
    </nav>
  );
}
