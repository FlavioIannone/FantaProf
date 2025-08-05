"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const tabs = [
  {
    icon: "bi bi-graph-up-arrow",
    label: "Panoramica",
    tabName: "overview",
  },
  { icon: "bi bi-cart", label: "Market", tabName: "market" },
  { icon: "bi bi-activity", label: "Eventi", tabName: "events" },
];

export default function DashboardTabsNavigator({
  className,
}: {
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState("");
  const searchParams = useSearchParams();
  const class_name = searchParams.get("class_name");
  const pathName = usePathname();

  if (!class_name) {
    return <>Nav</>;
  }

  useEffect(() => {
    const splittedPath = pathName.split("/");
    const activeTabName = splittedPath[splittedPath.length - 1];
    setActiveTab(activeTabName);
  }, [pathName]);

  if (activeTab === "")
    return (
      <nav
        className={`${className} flex d-navbar md:shadow md:border-b border-t border-base-300 items-center`}
      >
        <div
          role="tablist"
          className="d-tabs d-tabs-border md:block flex justify-around w-full"
        >
          {tabs.map((tabData, i) => (
            <button
              type="button"
              key={i}
              role="tab"
              disabled
              className={`d-tab`}
            >
              <i className={`text-lg ${tabData.icon} sm:me-1`} aria-hidden></i>
              <p className="sm:block hidden text-lg">{tabData.label}</p>
            </button>
          ))}
        </div>
      </nav>
    );

  return (
    <nav
      className={`${className} flex d-navbar md:shadow md:border-b border-t border-base-300 items-center`}
    >
      <div
        role="tablist"
        className="d-tabs d-tabs-border md:block flex w-full md:px-0 px-8"
      >
        {tabs.map((tabData, i) => (
          <Link
            key={i}
            role="tab"
            href={`${tabData.tabName}?class_name=${encodeURI(class_name)}`}
            className={`d-tab md:flex-0 flex-1 ${
              activeTab === tabData.tabName && "d-tab-active"
            }`}
          >
            <i
              className={`text-lg ${tabData.icon} ${
                activeTab === tabData.tabName &&
                "sm:mx-0 mx-5 transition-all text-xl"
              } sm:me-1`}
              aria-hidden
            ></i>
            <p className="sm:block hidden text-lg">{tabData.label}</p>
          </Link>
        ))}
      </div>
    </nav>
  );
}
