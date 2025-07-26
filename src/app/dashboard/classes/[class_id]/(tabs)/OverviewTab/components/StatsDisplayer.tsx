"use client";

import StatSection from "@/app/dashboard/classes/[class_id]/(tabs)/OverviewTab/components/StatSection";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Stats() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const stats = {
    members: searchParams.get("members"),
    initial_credits: searchParams.get("initial_credits"),
    curuser_points: searchParams.get("curuser_points"),
  };

  useEffect(() => {
    if (!stats.members || !stats.initial_credits || !stats.curuser_points) {
      router.replace("/dashboard");
    }
  }, [stats, router]);

  if (!stats.members || !stats.initial_credits || !stats.curuser_points) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-2.5 lg:px-8 md:px-6 sm:px-5 px-4 lg:py-6 md:py-5 sm:py-4 py-3 w-full">
      <StatSection
        title="Membri"
        value={stats.members}
        icon="bi-people"
        className="bg-linear-to-r from-purple-500 to-purple-600 shadow-xl shadow-purple-500/50"
      />
      <StatSection
        title="Crediti"
        value={stats.initial_credits}
        icon="bi-credit-card"
        className="bg-linear-to-r from-blue-500 to-blue-600 shadow-xl shadow-blue-500/50"
      />
      <StatSection
        title="Punti"
        value={stats.curuser_points}
        icon="bi-trophy"
        className="bg-linear-to-r from-green-500 to-green-600 shadow-xl shadow-green-500/50"
      />
      <StatSection
        title="Professori"
        value={stats.members}
        icon="bi-mortarboard"
        className="bg-linear-to-r from-orange-500 to-orange-600 shadow-xl shadow-orange-500/50"
      />
    </div>
  );
}
