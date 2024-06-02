import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    email: null,
  });

  const login = (token, email) => {
    setAuthState({
      isAuthenticated: true,
      token,
      email,
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      token: null,
      email: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
