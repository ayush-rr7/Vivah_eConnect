import { io } from "socket.io-client";
import { getActiveProfileId } from "../utils/getActiveProfile";
export const socket = io("http://localhost:3002", {
    auth: {
    profileId: getActiveProfileId()
  },
    withCredentials: true,
     autoConnect: false ,  // VERY IMPORTANT

},
);

