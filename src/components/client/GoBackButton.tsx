// components/GoBackButton.tsx
"use client";

import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="d-btn d-btn-ghost p-0"
      onClick={() => {
        router.back();
      }}
    >
      <i className="bi bi-arrow-left-short text-4xl" aria-hidden></i>
    </button>
  );
}
