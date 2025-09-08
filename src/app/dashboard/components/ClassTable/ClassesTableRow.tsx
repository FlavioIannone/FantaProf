"use client";
import { ClassRowType } from "@/lib/data/types.data";
import Link from "next/link";

import { useState } from "react";

export default function ClassesTableRow({
  classData,
}: {
  classData?: ClassRowType;
}) {
  const [loading, setLoading] = useState(false);

  // Reusable avatar icon
  const AvatarIcon = ({
    visible = true,
    skeleton = false,
  }: {
    visible?: boolean;
    skeleton?: boolean;
  }) => (
    <div
      className={`d-avatar size-18 rounded-full bg-base-300 p-2 md:p-4 sm:p-2 ${
        skeleton && "d-skeleton"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className={`bi bi-mortarboard size-full text-base-content ${
          !visible && "invisible"
        }`}
        viewBox="0 0 16 16"
        aria-hidden
      >
        <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z" />
        <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z" />
      </svg>
    </div>
  );

  if (!classData) {
    return (
      <div className="flex justify-between d-rounded-box p-4 bg-base-200 d-skeleton">
        <div className="flex items-center gap-2">
          <AvatarIcon visible={false} skeleton />
          <div className="flex flex-col justify-end gap-1">
            <h2 className="w-40 h-7 d-skeleton"></h2>
            <h3 className="w-20 h-5 d-skeleton"></h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      key={classData.class_id}
      href={`/dashboard/classes/${classData.class_id}/overview`}
      className={`flex justify-between bg-base-200 d-rounded-box p-4 ${
        loading && "animate-pulse"
      }`}
      onClick={() => {
        setLoading(true);
      }}
    >
      <div className="flex items-center gap-2">
        <AvatarIcon />
        <div className="flex flex-col justify-end">
          <h1 className="text-2xl">{classData.class_name}</h1>
          <div className="flex gap-1 text-sm opacity-70">
            <span>{classData.members} membri</span>
            <i className="bi bi-dot" aria-hidden></i>
            <span>{classData.teachers} professori</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end items-end">
        <h1 className="font-bold text-2xl">{classData.currUserData.points}</h1>
        <h2 className="opacity-70">Punti</h2>
      </div>
    </Link>
  );
}
