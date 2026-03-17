
import api from "./axios";
export const  connectReq= (senderProfileId,
receiverProfileId) => {
  console.log(senderProfileId,
receiverProfileId)
  return api.post("/connection/request", {senderProfileId,
receiverProfileId});
};

export const getConnection= (profileId,type,status)=>{
  console.log(profileId,type,status);
  return api.get("/connection", {
    params: {
      profileId,
      type,
      status
    }
  });
 
};

export const connectionRes=(connectionId,action)=>{
  const data = {
  status: action
};
  api.patch(`connection/respond/${connectionId}`,data)
}
export const removeConnection=(receiverId,data)=>{
  api.delete("connection/remove",data)
}