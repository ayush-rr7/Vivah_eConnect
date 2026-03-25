import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getConnection, connectionRes } from "../api/connectionService";
import { useAuth } from "../context/AuthContext";
import { getActiveProfileId } from "../utils/getActiveProfile";

function Connections() {
const { profiles } = useAuth();
// const profileId = profiles?.[0]?._id;
const profileId =  getActiveProfileId();;

const [connections, setConnections] = useState([]);
const [type, setType] = useState("received"); // received | sent
const [status, setStatus] = useState("pending"); // pending | accepted | rejected

const fetchConnections = async () => {
if(!profileId) return;

try {
const res = await getConnection(profileId,type,status);
console.log(res.data);
setConnections(res.data);
} catch(err){
console.log(err);
}};

useEffect(()=>{
fetchConnections();
},[profileId,type,status]);

const handleResponse = async (id,action)=>{
try{
await connectionRes(id,action);
fetchConnections();
}catch(err){
console.log(err);
}};
const btnStyle="p-2 m-2 bg-pink-600 rounded text-white focus:bg-pink-500";

if(!profileId){
return <div>Loading...</div>   // ✅ correct place
}


return (
  <div className="min-h-screen bg-gray-100 my-1">
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-2 text-center">
        Connections
      </h2>

      {/* Top Tabs (Type) */}
      <div className="flex justify-center border-b mb-4">
        {["received", "sent"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setType(t);
              setStatus("pending");
            }}
            className={`px-6 py-2 capitalize transition ${
              type === t
                ? "border-b-2 border-pink-600 text-pink-600 font-semibold"
                : "text-gray-500 hover:text-pink-500"
            }`}
          >
            {t === "received" ? "Inbox" : "Sent"}
          </button>
        ))}
      </div>

      {/* Status Tabs */}
      <div className="flex justify-center gap-8 border-b mb-6">
        {(type === "received"
          ? ["pending", "accepted"]
          : ["pending", "accepted", "rejected"]
        ).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`pb-2 capitalize transition ${
              status === s
                ? "border-b-2 border-pink-600 text-pink-600 font-semibold"
                : "text-gray-500 hover:text-pink-500"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Connection List */}
      <div className="space-y-3">
        {connections.map((c) => {
          const otherProfile =
            type === "received"
              ? c.senderProfileId
              : c.receiverProfileId;

          return (
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
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Chat
                  </Link>
                )}

                {/* Accept / Reject */}
                {type === "received" && c.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        handleResponse(c._id, "accepted")
                      }
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        handleResponse(c._id, "rejected")
                      }
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {connections.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No connections found
        </p>
      )}

    </div>
  </div>
);

}

export default Connections;

// import { getConnection, connectionRes } from "../api/connectionService";
// import { useState,useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// function Connection(){
// const { profiles } = useAuth();
// const [connections, setConnections] = useState([]);
//  const senderProfileId = profiles?.[0]?._id;
 
// const fetchConnection = async () => {
// try{
//   const res = await getConnection(senderProfileId,"pending");
//   setConnections(res.data);
//   // console.log(res.data);
// }catch(err){
//   console.log(err);
// }
// };

// useEffect(()=>{
//   if(!senderProfileId) return 

//   fetchConnection();
// },[senderProfileId]);

// const handleResponse = async (id, action) => {

// try{

// await connectionRes(id, action);

// fetchConnection(); // refresh list

// }catch(err){
// console.log(err);
// }

// };
// if(!senderProfileId){
// return <div>Loading...</div>   // ✅ correct place
// }

// return(
// <div>
// <Link to="/sent">Sent</Link>
// <Link to="/received">Sent</Link>
// <h1>Connection List</h1>

// {connections.map((c)=>(
  
// <div key={c._id}>

// {c.receiverProfileId
// } : {c.status}

// <button onClick={()=>handleResponse(c._id,className={btnStyle}"accepted")}>
// Accept
// </button>

// <button onClick={()=>handleResponse(c._id,className={btnStyle}"rejected")}>
// Reject
// </button>

// </div>

// ))}

// </div>
// )

// }

// export default Connection;
