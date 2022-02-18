import { createContext, useState, useCallback, useMemo } from "react";

import usersHttp from "../lib/http/usersHttp";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };
  const getUser = () => {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
  };
  const [token, setToken] = useState(getToken);
  const [user, setUser] = useState(getUser);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(
    async (values) => {
      setIsError(false);
      setIsLoading(true);
      try {
        const { data } = await usersHttp.loginUser(values);
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (error) {
        setIsError(true);
        setError(error);
      }
      setIsLoading(false);
    },
    [token, user]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, [token, user]);

  // const value = useMemo(() => {
  //   return {
  //     token,
  //     isLoading,
  //     isError,
  //     error,
  //     user,
  //     login,
  //     logout,
  //   };
  // }, [token, isLoading, isError, error, user, login, logout]);

  return (
    <AuthContext.Provider
      value={{ token, isLoading, isError, error, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
