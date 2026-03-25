// import { createContext } from "react";
// export const AuthContext = createContext();
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  logoutUser,
  getCurrentUser,
  registerUser
} from "../api/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data.user);
        setProfiles(res.data.profiles);
    } catch {
      setUser(null);
      setProfiles([]);
    }finally{
    setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (data) => {
    await loginUser(data);
    await fetchUser();
  };
  const signup = async (data) => {
    await registerUser(data);
    // await fetchUser();
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
     setProfiles([]);
  };
 const isAuthenticated = !!user;
 console.log(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{ user, profiles,signup, login, logout, loading ,isAuthenticated}}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ hook INSIDE SAME FILE
export const useAuth = () => useContext(AuthContext);