import { io } from "socket.io-client";
// import { getActiveProfileId } from "../utils/getActiveProfile";
//  import { useAuth } from "../context/AuthContext";
//  const { activeProfileId: profileId } = useAuth();

const API= import.meta.env.VITE_API_URL
export const socket = io(API, {
    withCredentials: true,
     autoConnect: false ,  // VERY IMPORTANT

},
);

