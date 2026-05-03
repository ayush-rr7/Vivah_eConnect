import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getConnection, connectionRes } from "../api/connectionService";
import { useAuth } from "../context/AuthContext";


function Connections() {
const { profiles } = useAuth();

const { activeProfileId: profileId } = useAuth();

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
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8">

    {/* Page Container */}
    <div className="max-w-4xl mx-auto px-4">

      {/* Heading */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Connections
      </h1>

      {/* Tabs Container */}
      <div className="bg-white rounded-2xl shadow-md p-6">

        {/* Type Tabs */}
        <div className="flex gap-4 mb-4">
          {["received", "sent"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setType(t);
                setStatus("pending");
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                type === t
                  ? "bg-pink-100 text-pink-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {t === "received" ? "Inbox" : "Sent"}
            </button>
          ))}
        </div>

        {/* Status Tabs */}
        <div className="flex gap-4 mb-6">
          {(type === "received"
            ? ["pending", "accepted"]
            : ["pending", "accepted", "rejected"]
          ).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-4 py-1 rounded-full text-xs capitalize transition
              ${
                status === s
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Connection List */}
        <div className="space-y-4">

          {connections.map((c) => {
            const otherProfile =
              type === "received"
                ? c.senderProfileId
                : c.receiverProfileId;

            return (
              <div
                key={c._id}
                className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition"
              >

                {/* Left Section */}
                <div className="flex items-center gap-3">

                  {/* Profile Image Placeholder */}
                  <div className="h-12 w-12 rounded-full bg-gray-200" />

                  <div>
                    <p className="font-semibold text-gray-800">
                      {otherProfile?.Name || "User"}
                    </p>

                    <span
                      className={`text-xs px-2 py-1 rounded-full
                      ${
                        c.status === "accepted"
                          ? "bg-green-100 text-green-600"
                          : c.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex gap-2">

                  {c.status === "accepted" && (
                    <Link
                      to={`/chat/${otherProfile._id}`}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm transition"
                    >
                      Chat
                    </Link>
                  )}

                  {type === "received" && c.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleResponse(c._id, "accepted")
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm transition"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          handleResponse(c._id, "rejected")
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition"
                      >
                        Reject
                      </button>
                    </>
                  )}

                </div>
              </div>
            );
          })}

          {/* Empty State */}
          {connections.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No connections found
            </p>
          )}

        </div>
      </div>
    </div>
  </div>
);

}

export default Connections;
