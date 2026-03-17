import { useEffect } from "react";
import { socket } from "../api/socket";

function Chat() {

  useEffect(() => {

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("receive_message", (data) => {
      console.log("Message:", data);
    });

    return () => {
      socket.off("connect");
      socket.off("receive_message");
    };

  }, []);

  const sendMessage = () => {
    socket.emit("send_message", {
      text: "Hello Dear Server"
    });
  };

  return (
    <>
      <h1>Chat App</h1>
      <button onClick={sendMessage}>Send Test</button>
    </>
  );
}

export default Chat;