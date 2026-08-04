import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Current User
  const getCurrentUser = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/user/current-user");

      setUser(data.user);
      setError("");
    } catch (err) {
      setUser(null);
      setError(err.response?.data?.message || "");
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (userData) => {
    try {
      setLoading(true);

      const { data } = await API.post("/user/register", userData);

      setUser(data.user);
      setError("");

      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (userData) => {
    try {
      setLoading(true);

      const { data } = await API.post("/user/login", userData);

      setUser(data.user);
      setError("");

      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);

      await API.post("/user/logout");

      setUser(null);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        getCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
