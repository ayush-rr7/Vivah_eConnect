
import { useEffect, useState } from "react";
import { socket } from "../api/socket";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios"
import { getActiveProfileId } from "../utils/getActiveProfile";
function Chat() {

  const { user, loading } = useAuth();
  const { id: receiverProfileId } = useParams();
  const senderProfileId=getActiveProfileId();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  /* ✅ SAFE ROOM ID */
  const roomId =
    user && receiverProfileId
      ? [senderProfileId, receiverProfileId].sort().join("_")
      : null;

  
useEffect(() => {
  if (!user || !receiverProfileId) return;

  // 1️⃣ fetch old messages
  const fetchMessages = async () => {
    try {
      console.log(receiverProfileId, 
      senderProfileId
    );
    
   const res = await api.get("messages/now",{
     params: {
      receiverProfileId, 
      senderProfileId
    
    }})
      setMessages(res.data);
      console.log(res.data); // must be array
    } catch (err) {
      console.log("Failed to fetch chat history:", err);
    }
  };

  fetchMessages();

  // 2️⃣ connect socket
  if (!socket.connected) socket.connect();

  // 3️⃣ receive real-time messages
  const receiveHandler = (msg) => {
    setMessages(prev => [...prev, msg]);
  };
  socket.on("receive_message", receiveHandler);

  // 4️⃣ offline messages
  const offlineHandler = (msgs) => {
    setMessages(prev => {
      const existingIds = new Set(prev.map(m => m._id));
      const newMsgs = msgs.filter(m => !existingIds.has(m._id));
      return [...prev, ...newMsgs];
    });
  };
  socket.on("offline_messages", offlineHandler);

  return () => {
    socket.off("receive_message", receiveHandler);
    socket.off("offline_messages", offlineHandler);
  };

}, [receiverProfileId, user]);

  /* ---------- SEND MESSAGE ---------- */
  const sendMessage = () => {

    if (!message.trim() || !roomId) return;

    socket.emit("send_message", {
      roomId,
      receiverProfileId,
      message
    });

    setMessages(prev => [
      ...prev,
      {
        senderId: senderProfileId,
        message
      }
    ]);

    setMessage("");
  };



  /* ---------- AUTH GUARD ---------- */
  if (loading) return <p>Loading account...</p>;
  if (!user) return <p>Please login</p>;



  return (
    <div className="p-4 m-5 border rounded">

      <h1>Welcome {user.Name}</h1>
      <h2>Chat with {receiverProfileId}</h2>

      <div>
        {messages.map((msg, i) => (
          <p key={i}>
            <b>{msg.senderId}</b>: {msg.message}
          </p>
        ))}
      </div>

      <input
        value={message}
        placeholder="Enter Message"
        onChange={(e)=>setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>

    </div>
  );
}

export default Chat;






// import { useEffect, useState } from "react";
// import { socket } from "../api/socket";
// import { useParams } from "react-router-dom";

// function Chat() {

//   const { id } = useParams(); // receiver
//   const receiverProfileId = id;
// console.log(receiverProfileId);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   /* listen incoming messages */
//   useEffect(() => {
//   socket.connect();
//   console.log("Trying socket connect");

//     const receiveHandler = (data) => {
//       setMessages(prev => [...prev, data]);
//     };

//     socket.on("receive_message", receiveHandler);

//     return () => {
//       socket.off("receive_message", receiveHandler);
//     };

//   }, []);

//   /* send message */
//   const sendMessage = () => {

//     if (!message.trim()) return;

//     socket.emit("send_message", {
//       receiverProfileId,
//       message
//     });

//     // optimistic UI update
//     setMessages(prev => [
//       ...prev,
//       {
//         senderId: "me",
//         message
//       }
//     ]);

//     setMessage("");
//   };

//   return (
//     <div className="p-4 m-5 border rounded">

//       <h2>Chat with {receiverProfileId}</h2>

//       <div>
//         {messages.map((msg, i) => (
//           <p key={i}>
//             <b>{msg.senderId}</b>: {msg.message}
//           </p>
//         ))}
//       </div>

//       <input
//         value={message}
//         placeholder="Enter Message"
//         className="border p-2  mb-3 rounded hover:scale-102"
//         onChange={(e)=>setMessage(e.target.value)}
//       />

//       <button onClick={sendMessage}>
//         Send
//       </button>

//     </div>
//   );
// }

// export default Chat;
