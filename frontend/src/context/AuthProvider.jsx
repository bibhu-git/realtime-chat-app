import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Make sure to install this package

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const cookieData = Cookies.get("jwt");
  const localStorageData = localStorage.getItem("chatApp");
  
  // Function to parse JSON or decode JWT
  const parseAuthData = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      try {
        return jwtDecode(data);
      } catch (error) {
        console.error("Failed to parse or decode auth data:", error);
        return undefined;
      }
    }
  };

  const initialUserState = cookieData || localStorageData;
  const [authUser, setAuthUser] = useState(
    initialUserState ? parseAuthData(initialUserState) : undefined
  );

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
