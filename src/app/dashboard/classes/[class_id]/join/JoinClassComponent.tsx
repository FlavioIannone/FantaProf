"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function JoinClassComponent({ class_id }: { class_id: string }) {
  const router = useRouter();

  const joinClassEndpoint = `/api/protected/classes/${class_id}/join`;

  useEffect(() => {
    fetch(joinClassEndpoint, {
      method: "PUT",
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        router.replace("/dashboard");
      } else if (res.status === 303) {
        res.json().then((data) => {
          const urlToRedirect = data.redirect as string;
          router.replace(urlToRedirect);
        });
      }
    });
  }, [class_id, router]);
  return (
    <main className="flex justify-center items-center size-full">
      <span className="d-loading d-loading-ring d-loading-xl"></span>
    </main>
  );
}
