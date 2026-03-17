
import api from "./axios";


export const getProfileDetail = (id) => {
  console.log(id);
  return api.get(`/api/user1/${id}`);
};


export const createProfiles = (data) => {
  return api.post("/api/user", data);
};
export const getProfiles = (data) => {
  return api.get("/api/user1", data);
};

