"use client";

import { useAuthUser } from "@/lib/hooks/useAuthUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import loading from "../loading";
import { useIdToken } from "@/lib/hooks/useIdToken";

export default function JoinClassComponent({ class_id }: { class_id: string }) {
  const user = useAuthUser();
  const router = useRouter();
  const { token } = useIdToken();

  const joinClassEndpoint = `/api/protected/classes/${class_id}/join`;

  useEffect(() => {
    if (!user || !token) {
      // Redirect to login with callback
      const encodedCallback = encodeURIComponent(joinClassEndpoint);
      router.replace(
        `/auth/login?callbackUrl=${encodedCallback}&reason=join-class`
      );
    } else {
      // You can auto-join here or show a confirmation
      // Example: call join API
      fetch("/api/protected/classes/${class_id}/join", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.status === 200) router.replace("/dashboard");
      });
    }
  }, [user, loading, class_id, router]);
  return (
    <main className="flex justify-center items-center size-full">
      <span className="d-loading d-loading-ring d-loading-xl"></span>
    </main>
  );
}
