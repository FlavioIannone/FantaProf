import DashboardNavbar from "@/components/DashboardNavbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "Dashboard | %s",
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="d-drawer">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="d-drawer-toggle"
          aria-hidden
        />
        <div className="d-drawer-content flex flex-col h-dvh overflow-hidden">
          {/* Page content */}
          <DashboardNavbar />
          {children}
        </div>
        <div className="d-drawer-side">
          <label
            htmlFor="dashboard-drawer"
            aria-label="close sidebar"
            className="d-drawer-overlay"
          ></label>
          <ul className="d-menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
