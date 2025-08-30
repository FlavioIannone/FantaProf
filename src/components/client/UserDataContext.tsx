"use client";

import { client_auth } from "@/lib/firebase-connection.client";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type UserDataContextType = {
  userData: User | undefined;
  setUserData: (data: User) => void;
};

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<User | undefined>();

  useEffect(() => {
    const unsubscribe = client_auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData(undefined);
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, [client_auth]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}

const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

export { UserDataProvider, useUserData };
