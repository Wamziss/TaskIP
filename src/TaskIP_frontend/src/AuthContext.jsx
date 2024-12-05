import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuthClient = async () => {
      try {
        const client = await AuthClient.create();
        setAuthClient(client);
        // Check if already authenticated
        setIsAuthenticated(await client.isAuthenticated());
      } catch (error) {
        console.error("AuthClient creation failed:", error);
      }
    };

    initializeAuthClient();
  }, []);

  const logout = async () => {
    if (authClient) {
      await authClient.logout();
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={authClient}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};