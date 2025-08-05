import { useEffect, useState } from "react";
import { client_auth } from "../firebase-connection";

export const useIdToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const user = client_auth.currentUser;
        if (!user) throw new Error("User not logged in");

        const idToken = await user.getIdToken();
        setToken(idToken);
      } catch (err) {

      } finally {
        setLoading(false);
      }
    };

    fetchToken();

    const unsubscribe = client_auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setToken(null);
        return;
      }
      const idToken = await user.getIdToken();
      setToken(idToken);
    });

    return () => unsubscribe();
  }, []);

  return { token, loading };
};
