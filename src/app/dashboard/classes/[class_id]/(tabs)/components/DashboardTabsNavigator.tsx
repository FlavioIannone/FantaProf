"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const tabs = [
  {
    icon: "bi bi-graph-up-arrow",
    label: "Panoramica",
    tabName: "overview",
  },
  { icon: "bi bi-cart", label: "Market", tabName: "market" },
  { icon: "bi bi-activity", label: "Eventi", tabName: "events" },
  { icon: "bi bi-backpack3", label: "Team", tabName: "team" },
];

export default function DashboardTabsNavigator({
  className,
}: {
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const pathName = usePathname();

  useEffect(() => {
    const splittedPath = pathName.split("/");
    const activeTabName = splittedPath[splittedPath.length - 1];
    setActiveTab(activeTabName);
  }, [pathName]);

  const TabButtonsSkeleton = () =>
    tabs.map((tabData) => (
      <button
        type="button"
        key={tabData.label}
        role="tab"
        disabled
        className="d-tab md:grow-0 grow flex md:space-x-1 md:flex-row flex-col md:h-auto h-max  "
      >
        <i className={`text-lg ${tabData.icon}`} aria-hidden></i>
        <p className="md:text-lg text-md">{tabData.label}</p>
      </button>
    ));

  const TabButtons = () =>
    tabs.map((tabData) => (
      <Link
        key={tabData.label}
        prefetch={true}
        role="tab"
        href={`${tabData.tabName}`}
        className={`d-tab md:grow-0 grow flex md:space-x-1 md:flex-row flex-col md:h-auto h-max ${
          activeTab === tabData.tabName && "d-tab-active"
        }`}
      >
        <i
          className={`text-lg ${tabData.icon} ${
            activeTab === tabData.tabName && "transition-all text-xl"
          }`}
          aria-hidden
        ></i>
        <p className="md:text-lg text-md">{tabData.label}</p>
      </Link>
    ));

  return (
    <nav
      className={`${className} flex d-navbar md:shadow md:border-b border-t border-base-300 items-center lg:px-8 md:px-6 sm:px-5 px-4`}
    >
      <div
        role="tablist"
        className="d-tabs d-tabs-border h-full flex md:space-x-5 space-x-0 w-full md:px-0 px-8"
      >
        {activeTab === null ? <TabButtonsSkeleton /> : <TabButtons />}
      </div>
    </nav>
  );
}
