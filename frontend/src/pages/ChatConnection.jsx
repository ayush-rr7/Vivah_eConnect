import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { getConnection, connectionRes } from "../api/connectionService";
import { useAuth } from "../context/AuthContext";
import { getActiveProfileId } from "../utils/getActiveProfile";


function ChatConnection(){
const [connections, setConnections] = useState([]);

  const { profiles } = useAuth();
const profileId =  getActiveProfileId();

useEffect(()=>{
  if(!profileId) return;

  const fetchChatList = async ()=>{
    const res1 = await getConnection(profileId,"received","accepted");
    const res2 = await getConnection(profileId,"sent","accepted");

    setConnections([...res1.data, ...res2.data]);
  };

  fetchChatList();
},[profileId]);


return (
  connections.map(c=>{

const otherProfile =
  c.senderProfileId === profileId
    ? c.receiverProfileId
    : c.senderProfileId;

return(
  <div key={c._id}>
    <b>{otherProfile}</b>

    <Link to={`/chat/${otherProfile}`}> Chat
    </Link>
  </div>
);

})
)

}
export default ChatConnection;