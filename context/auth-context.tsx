"use client";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isSignedIn: boolean;
  currentUser: string;
  viewedUser: string;
  selectedTag : any;
  currentUserDetails: any;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
  setCurrentUserDetails: React.Dispatch<React.SetStateAction<string>>;
  setViewedUser: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
  signOut: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface Props {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(() => {
    if (typeof sessionStorage !== "undefined") {
      const storedValue = sessionStorage.getItem("isSignedIn");
      return storedValue ? JSON.parse(storedValue) : false;
    }
    return false;
  });
  const [currentUser, setCurrentUser] = useState<string>(() => {
    return sessionStorage.getItem("currentUser") || "";
  });
  const [currentUserDetails, setCurrentUserDetails] = useState<string>(() => {
    return sessionStorage.getItem("currentUserDetails") || "";
  });
  const [viewedUser, setViewedUser] = useState<string>(() => {
    return sessionStorage.getItem("viewedUser") || "";
  });
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    sessionStorage.setItem("isSignedIn", JSON.stringify(isSignedIn));
    sessionStorage.setItem("currentUser", currentUser);
    sessionStorage.setItem("viewedUser", viewedUser);
  }, [isSignedIn, currentUser, viewedUser]);

  //change current User details on changing currentUser
  useEffect(() => {
    if (currentUser) {
      (async()=>{
        const userData= await fetchCurrentUserDetails(currentUser);
        setCurrentUserDetails(userData);
      if (sessionStorage.getItem("currentUserDetails"))
        sessionStorage.removeItem("currentUserDetails");
      const data= JSON.stringify(userData);
      console.log(data);
        sessionStorage.setItem(
        "currentUserDetails",
        data
      );
        })();
    } else console.log("Current User cleared");
  }, [currentUser]);

  const fetchCurrentUserDetails = async (username: any) => {
    const { data } = await axios.get(
      `${process.env.SERVER_URL}/api/user/${username}`
    );
    // console.log("Fetched current user details");
    // console.log(data);
    return data;
  };
  const signOut = () => {
    setIsSignedIn(false);
    setCurrentUser("");
    setCurrentUserDetails("");
    setViewedUser("");
    setSelectedTag("");
    sessionStorage.clear();
  };
  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        currentUser,
        viewedUser,
        selectedTag,
        currentUserDetails,
        setIsSignedIn,
        setCurrentUser,
        setCurrentUserDetails,
        setViewedUser,
        setSelectedTag,
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
