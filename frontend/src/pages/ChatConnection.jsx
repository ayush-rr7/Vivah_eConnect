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


// const [users, setUsers] = useState([]);
 
//   const fetchUser = async () => {
//     try {
//       const res = await getProfileDetail(id);
//       setUsers(res.data);
//       // console.log(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, [receiverProfileId]);







return (
  connections.map(c=>{

const otherProfile =
  c.senderProfileId === profileId
    ? c.receiverProfileId
    : c.senderProfileId;

return(
   <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
  <div
              key={c._id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
             
              {/* Left: Profile Info */}
              <div>
                <p className="font-semibold text-lg">
                  {otherProfile?.Name || "User"}
                </p>

                <p className="text-sm text-gray-500 capitalize">
                  {c.status}
                </p>
              </div>

              {/* Right: Actions */}
              <div className="flex gap-2 items-center">
                
                {/* Chat Button */}
                {c.status === "accepted" && (
                  <Link
                    to={`/chat/${otherProfile._id}`}
                    state={{ profile: otherProfile }}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Chat
                  </Link>
                )}
                  </div>
            </div>
            </div>
          
       
);

})
)

}
export default ChatConnection;