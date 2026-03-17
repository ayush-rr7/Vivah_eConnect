
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
}

};

useEffect(()=>{
fetchConnections();
},[profileId,type,status]);

const handleResponse = async (id,action)=>{

try{

await connectionRes(id,action);
fetchConnections();

}catch(err){
console.log(err);
}

};

const btnStyle="p-2 m-2 bg-pink-600 rounded text-white focus:bg-pink-500";

if(!profileId){
return <div>Loading...</div>   // ✅ correct place
}
return(

<div>

<h2 className="">Connections</h2>

{/* Type selection */}

<button onClick={()=>setType("received")}className={btnStyle}>Received</button>
<button onClick={()=>setType("sent")}className={btnStyle}>Sent</button>

<br/><br/>

{/* Status selection */}

<button onClick={()=>setStatus("pending")} className={btnStyle}>Pending</button>
<button onClick={()=>setStatus("accepted")} className={btnStyle  }>Accepted</button>
<button onClick={()=>setStatus("rejected")} className={btnStyle}>Rejected</button>

<hr/>

{/* Connection List */}

{connections.map(c=>{

const otherProfile =
type === "received"
? c.senderProfileId
: c.receiverProfileId;

return(

<div key={c._id}>
  <b> {c.senderProfileId}</b>

{/* <b>{otherProfile?.name}</b> : {c.status} */}

{/* Accept Reject only for received pending */}

{ c.status === "accepted" && (
  <>
  <Link to = {`/chat/${otherProfile}`}>  Chat</Link>
  </>
)}

{type === "received" && c.status === "pending" && (

<>
<button onClick={()=>handleResponse(c._id,"accepted")} className={btnStyle}>
Accept
</button>

<button onClick={()=>handleResponse(c._id,"rejected")}className={btnStyle}>
Reject
</button>
</>

)}

</div>

);

})}

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
