import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { getConnection, connectionRes } from "../api/connectionService";
import { useAuth } from "../context/AuthContext";
// import { getActiveProfileId } from "../utils/getActiveProfile";


function ChatConnection(){
const [connections, setConnections] = useState([]);

  const { profiles } = useAuth();
// const profileId =  getActiveProfileId();
const { activeProfileId: profileId } = useAuth();

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
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8">

  <div className="max-w-3xl mx-auto px-4">

    <h1 className="text-2xl font-semibold text-gray-800 mb-6">
      Your Connections
    </h1>

    <div className="space-y-4">
      {connections.map((c) => {
        const otherProfile =
          c.senderProfileId === profileId
            ? c.receiverProfileId
            : c.senderProfileId;

        return (
          <div
            key={c._id}
            className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between hover:shadow-lg transition"
          >
            
            {/* Left Section */}
            <div>
              <p className="font-semibold text-gray-800">
                {otherProfile?.Name || "User"}
              </p>

              <span
                className={`text-xs px-2 py-1 rounded-full mt-1 inline-block
                ${
                  c.status === "accepted"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {c.status}
              </span>
            </div>

            {/* Right Section */}
            <div className="flex gap-2">

              {c.status === "accepted" && (
                <Link
                  to={`/chat/${otherProfile._id}`}
                  state={{ profile: otherProfile }}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  Chat
                </Link>
              )}

            </div>
          </div>
        );
      })}
    </div>

  </div>
</div>
)
}
export default ChatConnection;