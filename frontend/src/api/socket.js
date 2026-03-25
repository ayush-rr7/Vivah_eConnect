import { io } from "socket.io-client";
import { getActiveProfileId } from "../utils/getActiveProfile";
const API= import.meta.env.VITE_API_URL
export const socket = io(API, {
    auth: {
    profileId: getActiveProfileId()
  },
    withCredentials: true,
     autoConnect: false ,  // VERY IMPORTANT

},
);

