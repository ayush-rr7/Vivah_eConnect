import mongoose from 'mongoose'

const connectionSchema =mongoose.Schema({
  // senderId:{
  // type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     required: true
  // },
  // receiverId:{
  //   type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //       required: true
  // },

  senderProfileId:{
type: mongoose.Schema.Types.ObjectId,
ref:"Profile",
required:true
},

receiverProfileId:{
type: mongoose.Schema.Types.ObjectId,
ref:"Profile",
required:true
},
  status:{
     type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    required: true
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // }
  
},{timestamps:true})
const Connection =mongoose.model('Connection',connectionSchema);

export default Connection;
