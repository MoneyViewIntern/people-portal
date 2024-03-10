"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isSignedIn: boolean;
  currentUser : string;
  setCurrentUser : React.Dispatch<React.SetStateAction<string>>;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  signOut : ()=>void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface Props{
    children : React.ReactNode
}
export const AuthProvider: React.FC<Props> = ({children}) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(() => {
    // Initialize isSignedIn state with stored value or default to false
    if(typeof localStorage !== 'undefined'){

      const storedValue = localStorage?.getItem('isSignedIn');
      return storedValue ? JSON.parse(storedValue) : false;
    }
    return false;
  });
  const [currentUser, setCurrentUser] = useState<string>(() => {
    // Initialize currentUser state with stored value or default to an empty string
    return localStorage.getItem('currentUser') || '';
    // if(typeof localStorage !== 'undefined') return localStorage.getItem('currentUser') || '';
    // else if (typeof sessionStorage !== 'undefined')return sessionStorage.getItem('currentUser')||'';
    // else {
    //   console.log("Web storage not supported");
    //   return '';
    // }
  });
  useEffect(() => {
    // Update localStorage when isSignedIn or currentUser changes
    localStorage.setItem('isSignedIn', JSON.stringify(isSignedIn));
    localStorage.setItem('currentUser', currentUser);
  }, [isSignedIn, currentUser]);

    const signOut = ()=>{
      setIsSignedIn(false);
      setCurrentUser("");
    }
  return (
    <AuthContext.Provider value={{ isSignedIn, currentUser, setCurrentUser, setIsSignedIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};