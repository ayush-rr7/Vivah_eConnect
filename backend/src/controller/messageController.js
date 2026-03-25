import Message from '../models/Message.js';

export const getChatHistory = async (req, res) => {

  console.log("IN msg controller");
  // const senderProfileId = req.senderProfileId; // from JWT 
  const { senderProfileId, receiverProfileId } = req.query
  

  console.log(senderProfileId, receiverProfileId);
  

  try {
    const messages = await Message.find({
      $or: [
        { senderProfileId, receiverProfileId },
        { senderProfileId: receiverProfileId, receiverProfileId: senderProfileId }
      ]
    }).sort({ createdAt: 1 }); // oldest first

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};