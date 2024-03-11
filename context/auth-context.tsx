"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isSignedIn: boolean;
  currentUser: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  signOut: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface Props {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(() => {
    if (typeof localStorage !== "undefined") {
      const storedValue = localStorage?.getItem("isSignedIn");
      return storedValue ? JSON.parse(storedValue) : false;
    }
    return false;
  });
  const [currentUser, setCurrentUser] = useState<string>(() => {
    return localStorage.getItem("currentUser") || "";
  });
  useEffect(() => {
    localStorage.setItem("isSignedIn", JSON.stringify(isSignedIn));
    localStorage.setItem("currentUser", currentUser);
  }, [isSignedIn, currentUser]);

  const signOut = () => {
    setIsSignedIn(false);
    setCurrentUser("");
    localStorage.clear();
  };
  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        currentUser,
        setCurrentUser,
        setIsSignedIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
