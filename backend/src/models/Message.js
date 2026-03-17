import { time } from 'console';
import mongoose from 'mongoose';

const messageSchema= new mongoose.Schema(
  {
    senderProfileId:{
       type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true
    },
    receiverProfileId:{
    type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true
    },
    message:String,
    status:{
       type: String,
      enum: ["sent", "delivered", "seen"],
      default: "sent"
    }
  },
  {timestamps:true}
);
const Message= mongoose.model("Message", messageSchema);
export default Message;