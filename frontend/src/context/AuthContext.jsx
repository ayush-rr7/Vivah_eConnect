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

//-----active profile-------
  const [activeProfileId, setActiveProfileId] = useState(() => {
  return localStorage.getItem("activeProfileId") || null;
});

// persist automatically
useEffect(() => {
  if (activeProfileId) {
    localStorage.setItem("activeProfileId", activeProfileId);
    
  }
}, [activeProfileId]);



// set default only when profiles load AND nothing selected
useEffect(() => {
  if (!activeProfileId && profiles?.length > 0) {
    setActiveProfileId(profiles[0]._id);
  }
}, [profiles, activeProfileId]);



//auth services
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
      value={{ user, profiles,signup, login, logout, loading ,isAuthenticated,activeProfileId,
    setActiveProfileId,}}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ hook INSIDE SAME FILE
export const useAuth = () => useContext(AuthContext);