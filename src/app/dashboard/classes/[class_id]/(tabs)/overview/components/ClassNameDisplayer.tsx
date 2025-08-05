"use client";

import { useSearchParams } from "next/navigation";

export default function ClassNameDisplayer() {
  const searchParams = useSearchParams();
  const class_name = searchParams.get("class_name");

  if (!class_name) return null;

  return <h1 className="sm:text-2xl text-xl">{`Classe ${class_name}`}</h1>;
}
