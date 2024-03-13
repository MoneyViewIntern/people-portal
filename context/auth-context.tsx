"use client";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isSignedIn: boolean;
  currentUser: string;
  viewedUser: string;
  currentUserDetails: any;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
  setCurrentUserDetails: React.Dispatch<React.SetStateAction<string>>;
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
      const storedValue = localStorage.getItem("isSignedIn");
      return storedValue ? JSON.parse(storedValue) : false;
    }
    return false;
  });
  const [currentUser, setCurrentUser] = useState<string>(() => {
    return localStorage.getItem("currentUser") || "";
  });
  const [currentUserDetails, setCurrentUserDetails] = useState<string>(() => {
    return localStorage.getItem("currentUserDetails") || "";
  });
  const [viewedUser, setViewedUser] = useState<string>(() => {
    return localStorage.getItem("viewedUser") || "";
  });

  useEffect(() => {
    localStorage.setItem("isSignedIn", JSON.stringify(isSignedIn));
    localStorage.setItem("currentUser", currentUser);
    localStorage.setItem("viewedUser", viewedUser);
  }, [isSignedIn, currentUser, viewedUser]);

  //change current User details on changing currentUser
  useEffect(() => {
    if (currentUser) {
      fetchCurrentUserDetails(currentUser);
      if (localStorage.getItem("currentUserDetails"))
        localStorage.removeItem("currentUserDetails");
      localStorage.setItem(
        "currentUserDetails",
        JSON.stringify(currentUserDetails)
      );
    } else console.log("Current User cleared");
  }, [currentUser]);

  const fetchCurrentUserDetails = async (username: any) => {
    const { data } = await axios.get(
      `http://localhost:8080/api/user/${username}`
    );
    console.log("Fetched current user details");
    console.log(data);
    setCurrentUserDetails(data);
  };
  const signOut = () => {
    setIsSignedIn(false);
    setCurrentUser("");
    setCurrentUserDetails("");
    setViewedUser("");
    localStorage.clear();
  };
  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        currentUser,
        viewedUser,
        currentUserDetails,
        setIsSignedIn,
        setCurrentUser,
        setCurrentUserDetails,
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
