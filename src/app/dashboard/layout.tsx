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
          tabIndex={-1}
        />
        <div className="d-drawer-content flex flex-col h-dvh">
          {/* Page content */}
          <div className="flex grow w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
