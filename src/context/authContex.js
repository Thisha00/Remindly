import { createContext, useContext, useState } from "react";
import { setTokens } from "../services/tokenService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (userData, accessToken, refreshToken) => {
    console.log("Logging in user:", userData);
    setUser(userData);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setTokens(accessToken, refreshToken);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        setUser,
        isLoading,
        setIsLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
