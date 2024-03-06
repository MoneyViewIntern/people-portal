"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  signOut : ()=>void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface Props{
    children : React.ReactNode
}
export const AuthProvider: React.FC<Props> = ({children}) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/isSignedIn');
//         setIsSignedIn(response.data.isSignedIn);
//       } catch (error) {
//         console.error('Error fetching isSignedIn:', error);
//       }
//     };

//     fetchData();
//   }, []);
    useEffect(()=>{
        setIsSignedIn(true);
    }, []);
    const signOut = ()=>{
      setIsSignedIn(false);
    }
  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, signOut }}>
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