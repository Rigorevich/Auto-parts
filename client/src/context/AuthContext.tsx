import { createContext, ReactNode } from 'react';

import { AuthClient } from '../api/axios';

import inMemoryJWT from '../services/inMemoryJWT';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const handleLogOut = () => {};
  const handleSignUp = () => {};
  const handleSignIn = () => {};
};
