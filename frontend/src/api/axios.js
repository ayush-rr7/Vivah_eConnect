// src/api/axios.js

import axios from "axios";

const API= import.meta.env.VITE_API_URL
const api = axios.create({
  baseURL:API,
  withCredentials: true, // send cookies automatically
  
});

export default api;