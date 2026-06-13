import profile2 from "../assets/profile2.png";

export const optimizeImage = (url, width = 600, height = 900, fit = "fill") => {
  if (!url) return profile2;

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width},h_${height},c_${fit}/`
  );
};