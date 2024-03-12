"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isSignedIn: boolean;
  currentUser: string;
  viewedUser : string;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
  setViewedUser: React.Dispatch<React.SetStateAction<string>>;
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
  const [viewedUser, setViewedUser] = useState<string>(() => {
    return localStorage.getItem("viewedUser") || "";
  });
  useEffect(() => {
    localStorage.setItem("isSignedIn", JSON.stringify(isSignedIn));
    localStorage.setItem("currentUser", currentUser);
    localStorage.setItem("viewedUser", viewedUser);
  }, [isSignedIn, currentUser, viewedUser]);

  const signOut = () => {
    setIsSignedIn(false);
    setCurrentUser("");
    setViewedUser("");
    localStorage.clear();
  };
  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        currentUser,
        viewedUser,
        setIsSignedIn,
        setCurrentUser,
        setViewedUser,
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
