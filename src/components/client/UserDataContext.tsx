"use client";

import { User } from "firebase/auth";
import { createContext, useContext, useState } from "react";

type UserDataContextType = {
  userData: User | undefined;
  setUserData: (data: User) => void;
};

const ModalContext = createContext<UserDataContextType | undefined>(undefined);

function UserDataProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [userData, setUserData] = useState<User | undefined>();

  return (
    <ModalContext.Provider value={{ userData, setUserData }}>
      {children}
    </ModalContext.Provider>
  );
}

const useUserData = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

export { UserDataProvider, useUserData };
