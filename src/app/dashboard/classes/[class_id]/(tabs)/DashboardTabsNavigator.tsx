"use client";

import Link from "next/link";
import { useState } from "react";

const tabs = [
  {
    icon: "bi bi-graph-up-arrow",
    label: "Panoramica",
  },
  { icon: "bi bi-cart", label: "Market" },
  { icon: "bi bi-activity", label: "Eventi" },
];

export default function DashboardTabsNavigator() {
  const [tab, setTab] = useState(0);
  return (
    <nav className="flex d-navbar shadow border-b border-base-300 items-center">
      <div role="tablist" className="d-tabs d-tabs-border">
        {tabs.map((tabData, i) => (
          <Link
            key={i}
            role="tab"
            href={`#tab${i}`}
            className={`d-tab ${tab === i ? "d-tab-active" : ""}`}
            onClick={() => setTab(i)}
          >
            <i className={`${tabData.icon} me-1`} aria-hidden></i>
            {tabData.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
