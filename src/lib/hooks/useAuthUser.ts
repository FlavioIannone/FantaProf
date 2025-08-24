import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { client_auth } from "@/lib/firebase-connection.client";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(client_auth, (user) => {
      setUser(user ?? null);
    });

    return () => unsubscribe();
  }, []);

  return user;
}
