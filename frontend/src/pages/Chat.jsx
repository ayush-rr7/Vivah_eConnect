import { useEffect, useRef, useState } from "react";
import { socket } from "../api/socket";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function Chat() {
  const { user, loading, activeProfileId: senderProfileId } = useAuth();

  const { id: receiverProfileId } = useParams();

  const location = useLocation();
  const profile = location.state?.profile;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const roomId =
    senderProfileId && receiverProfileId
      ? [senderProfileId, receiverProfileId].sort().join("_")
      : null;

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

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


    //real-time
    fetchMessages();

    socket.auth = {
      profileId: senderProfileId,
    };

    // Connect socket if not connected
    if (!socket.connected) {
      socket.connect();
    }

    // Incoming messages
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

    // Offline messages
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

    // Cleanup
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

    // Emit to backend
    socket.emit("send_message", newMessage);

    // Instant frontend update
    setMessages((prev) => [
      ...prev,
      {
        senderProfileId,
        message: message.trim(),
        createdAt: new Date(),
      },
    ]);

    setMessage("");
  };

  /* ---------------- AUTH GUARD ---------------- */
  if (loading) return <p>Loading account...</p>;
  if (!user) return <p>Please login first</p>;

  return (
    <div className=" bg-gray-50 flex justify-center items-center p-4">

      {/* Chat Container */}
      <div
        className="
          w-full max-w-4xl
          bg-white
          rounded-3xl
          border border-gray-100
          shadow-xl
          flex flex-col
          h-[88vh]
          overflow-hidden
        "
        
      >

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-white flex items-center justify-between">

          <div className="flex items-center gap-4">

            {/* Avatar */}
            <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-lg">
              {profile?.Name?.charAt(0) || "C"}
            </div>

            {/* Info */}
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                {profile?.Name || "Chat"}
              </h1>

              <p className="text-sm text-gray-500">
                Vivah E-Connect
              </p>
            </div>
          </div>

          {/* Online Status
          <div className="text-xs text-green-600 font-medium">
            Online
          </div> */}
        </div>

        {/* Messages */}
        <div
          className="
            flex-1
            overflow-y-auto
            px-4 py-6
            space-y-4
            bg-gradient-to-b from-gray-50 to-white
          "
        >

          {/* Empty State */}
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">

              <div className="text-5xl mb-4">
                💬
              </div>

              <p className="text-lg font-medium">
                Start your conversation
              </p>

              <p className="text-sm">
                Send your first message securely
              </p>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => {
            const isMe =
              msg.senderProfileId?.toString() ===
              senderProfileId?.toString();

            return (
              <div
                key={msg._id || i}
                className={`flex ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >

                <div
                  className={`
                    relative max-w-[75%]
                    px-4 py-3 rounded-2xl
                    shadow-sm text-sm
                    break-words transition-all
                    ${
                      isMe
                        ? "bg-pink-500 text-white rounded-br-md"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                    }
                  `}
                >

                  {/* Message */}
                  <p className="pr-10 leading-relaxed">
                    {msg.message}
                  </p>

                  {/* Time */}
                  <span
                    className={`
                      absolute bottom-1 right-3
                      text-[10px]
                      ${
                        isMe
                          ? "text-pink-50"
                          : "text-gray-600"
                      }
                    `}
                  >
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Auto Scroll Ref */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100 bg-white">

          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2">

            <input
             aria-label="Message input"
              type="text"
              value={message}
              placeholder="Type a message..."
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className="
                flex-1 bg-transparent
                px-2 py-2 text-sm
                focus:outline-none
              "
            />

            <button
               type="button"
              onClick={sendMessage}
              className="
                bg-pink-500 hover:bg-pink-600
                text-white
                px-5 py-2.5
                rounded-xl
                text-sm font-medium
                transition-all duration-200
                hover:scale-105
              "
            >
              Send
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;