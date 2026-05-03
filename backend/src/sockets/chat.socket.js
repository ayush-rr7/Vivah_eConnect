import Message from '../models/Message.js'
const onlineUsers = new Map();


const chatHandler = async(io, socket) => {

  const userId = socket.user.id;
   const senderProfileId = socket.profile.id;
  console.log(userId,senderProfileId);

  /* store online user */
  onlineUsers.set(senderProfileId, socket.id);
  console.log("Online Users:", onlineUsers);

  //deliver missed messages
  
  const pendingMessages = await Message.find({
    receiverProfileId: senderProfileId,
    status: "sent"
  });

  if (pendingMessages.length) {

    socket.emit(
      "offline_messages",
      pendingMessages
    );

    await Message.updateMany(
      {
        receiverProfileId: senderProfileId,
        status: "sent"
      },
      { status: "delivered" }
    );
  }



  /* receive message */
socket.on("send_message", async ({ message, receiverProfileId }) => {
  const newMsg = await Message.create({
    senderProfileId,
    receiverProfileId,
    message
  });

    console.log({newMsg} );

    const receiverSocketId =
      onlineUsers.get(receiverProfileId);

    if (receiverSocketId) {

      
      io.to(receiverSocketId).emit(
        "receive_message",
         newMsg
      );
       console.log("Delivered realtime");
    }
    else{
      console.log("User offline");
    }
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(senderProfileId);
    console.log(" Disconnected:", senderProfileId);
  });

};

export default chatHandler;