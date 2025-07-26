"use client";
import DashboardAside from "./DashboardAside";

export default function DashboardDrawer() {
  return (
    <div className="d-drawer-side md:hidden ">
      <label
        htmlFor="dashboard-drawer"
        aria-label="close sidebar"
        className="d-drawer-overlay"
      ></label>
      <div className="bg-base-200 text-base-content min-h-full sm:w-80 w-full p-4 flex flex-col justify-between">
        <DashboardAside />
      </div>
    </div>
  );
}
