import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Backend URL
  const serverUrl = "https://mern-integeration-backend.onrender.com";

  // ================= GET CURRENT USER =================

  const getCurrentUser = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        serverUrl + "/api/user/current-user",
        {
          withCredentials: true,
        }
      );

      setUser(response.data.user);
      setError("");
    } catch (error) {
      console.log(error);

      setUser(null);
      setError(
        error.response?.data?.message || "Unable to get current user"
      );
    } finally {
      setLoading(false);
    }
  };


  // ================= REGISTER =================

  const register = async (userData) => {
    try {
      setLoading(true);

      const response = await axios.post(
        serverUrl + "/api/user/register",
        userData,
        {
          withCredentials: true,
        }
      );

      setUser(response.data.user);
      setError("");

      return response.data;

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message || "Registration failed"
      );

      return null;

    } finally {
      setLoading(false);
    }
  };


  // ================= LOGIN =================

  const login = async (userData) => {
    try {
      setLoading(true);

      const response = await axios.post(
        serverUrl + "/api/user/login",
        userData,
        {
          withCredentials: true,
        }
      );

      setUser(response.data.user);
      setError("");

      return response.data;

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message || "Login failed"
      );

      return null;

    } finally {
      setLoading(false);
    }
  };


  // ================= LOGOUT =================

  const logout = async () => {
    try {
      setLoading(true);

      await axios.post(
        serverUrl + "/api/user/logout",
        {},
        {
          withCredentials: true,
        }
      );

      setUser(null);
      setError("");

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message || "Logout failed"
      );

    } finally {
      setLoading(false);
    }
  };


  // ================= CHECK USER ON PAGE LOAD =================

  useEffect(() => {
    getCurrentUser();
  }, []);


  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        serverUrl,
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


// Custom Hook
export const useUser = () => {
  return useContext(UserContext);
};
