"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ClassNameDisplayer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const class_name = searchParams.get("class_name");

  useEffect(() => {
    if (!class_name) {
      router.replace("/dashboard");
    }
  }, [class_name, router]);

  if (!class_name) return null;

  return <h1 className="sm:text-2xl text-xl">{`Classe ${class_name}`}</h1>;
}
