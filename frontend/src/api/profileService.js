
import api from "./axios";


export const getProfileDetail = (id) => {
  console.log(id);
  return api.get(`/api/profileDetail/${id}`);
};


export const createProfiles = (data) => {
  return api.post("/api/createProfile", data);
};

export const editProfiles = (id,data) => {
  return api.put(`/api/editProfile/${id}`, data);
};

export const getProfiles = (id, page = 1) => {
  return api.get(
    `api/getProfile/${id}?page=${page}&limit=12`
  );
};

