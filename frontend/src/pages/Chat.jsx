import { useEffect, useState } from "react";
import { socket } from "../api/socket";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function Chat() {
  const { user, loading, activeProfileId: senderProfileId } = useAuth();

  
  const { id: receiverProfileId } = useParams();
console.log(senderProfileId,receiverProfileId);
  
  const location = useLocation();
  const profile = location.state?.profile;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  
  const roomId =
    senderProfileId && receiverProfileId
      ? [senderProfileId, receiverProfileId].sort().join("_")
      : null;

  /* ---------------- FETCH + SOCKET ---------------- */
  useEffect(() => {
    if (!user || !senderProfileId || !receiverProfileId) return;

    // Fetch old messages
    const fetchMessages = async () => {
      try {
        const res = await api.get("/messages/now", {
          params: {
            senderProfileId,
            receiverProfileId,
          },
        });

        setMessages(res.data || []);
      } catch (err) {
        console.log("Failed to fetch messages:", err);
      }
    };

    fetchMessages();

    socket.auth = {
     profileId: senderProfileId
    };
    //  Connect socket if not connected
    if (!socket.connected) {
      socket.connect();
    }

    // Real-time incoming messages
    const receiveHandler = (msg) => {
      setMessages((prev) => {
        
        const alreadyExists = prev.some(
          (m) => m._id && msg._id && m._id === msg._id
        );

        if (alreadyExists) return prev;

        return [...prev, msg];
      });
    };

    socket.on("receive_message", receiveHandler);

    //Offline messages (if any)
    const offlineHandler = (msgs) => {
      setMessages((prev) => {
        const existingIds = new Set(prev.map((m) => m._id));

        const newMsgs = msgs.filter(
          (m) => !m._id || !existingIds.has(m._id)
        );

        return [...prev, ...newMsgs];
      });
    };

    socket.on("offline_messages", offlineHandler);

    // cleanup
    return () => {
      socket.off("receive_message", receiveHandler);
      socket.off("offline_messages", offlineHandler);
    };
  }, [user, senderProfileId, receiverProfileId]);

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = () => {
    if (!message.trim() || !roomId) return;

    const newMessage = {
      roomId,
      senderProfileId,
      receiverProfileId,
      message: message.trim(),
    };

    // emit to backend
    socket.emit("send_message", newMessage);

    // instant frontend update
    setMessages((prev) => [
      ...prev,
      {
        // senderId: senderProfileId,
        senderProfileId,
        message: message.trim(),
      },
    ]);

    setMessage("");
  };

  /* ---------------- AUTH GUARD ---------------- */
  if (loading) return <p>Loading account...</p>;
  if (!user) return <p>Please login first</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md flex flex-col h-[80vh]">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">
            {profile?.Name || "Chat"}
          </h1>

          <span className="text-sm text-gray-500">
            Profile Chat
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => {
            /*
              IMPORTANT:
              compare with senderProfileId
              not user._id
            */
           const isMe =
            msg.senderProfileId?.toString() === senderProfileId?.toString();
           
            return (
              <div
                key={msg._id || i}
                className={`flex ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                    isMe
                      ? "bg-pink-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2">
          <input
            type="text"
            value={message}
            placeholder="Type a message..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            onClick={sendMessage}
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;



