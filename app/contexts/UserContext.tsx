"use client";
import { createContext, useContext, useState, useEffect } from "react";

type UserContextType = {
  userName: string;
  setUserName: (name: string) => void;
  isHydrated: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Check localStorage for saved username
    const savedUserName = localStorage.getItem("userName");
    if (savedUserName) {
      setUserName(savedUserName);
    }
    setIsHydrated(true);
  }, []);

  const handleSetUserName = (name: string) => {
    setUserName(name);
    localStorage.setItem("userName", name);
  };

  return (
    <UserContext.Provider
      value={{ userName, setUserName: handleSetUserName, isHydrated }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
