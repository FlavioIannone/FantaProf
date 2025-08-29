"use client";

import { useUserData } from "@/components/client/UserDataContext";

export default function UsernameDisplayer() {
  const userData = useUserData();
  return (
    <h1 className="text-2xl mb-2.5 font-extrabold">
      Bentornato{", " + userData.userData?.displayName}!
    </h1>
  );
}
