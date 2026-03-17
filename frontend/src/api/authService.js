// src/api/authService.js

import api from "./axios";

// Register
export const registerUser = (data) => {
  return api.post("/auth/signup", data);
};

// Login
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

// Get logged user
export const getCurrentUser = () => {
  return api.get("/auth/me");
};

// Logout
export const logoutUser = () => {
  return api.post("/auth/logout");
};