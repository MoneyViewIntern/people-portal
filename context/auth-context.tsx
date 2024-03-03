// context/AuthContext.tsx
import { createContext, useContext, useState } from 'react';
import {genSaltSync, hashSync} from "bcrypt-ts"
import axios from 'axios';

interface AuthContextType {
  signIn: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: Readonly<{children: React.ReactNode;}>) => 
{
  const signIn = async (username: string, password: string) => {
    const hashedPassword = await hashPassword(password);

    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password: hashedPassword
      });
      if (response.status === 200) {
        // Handle successful sign-in
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle error
    }
  };

  const hashPassword = async (password: string) => {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
  };

  return <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
