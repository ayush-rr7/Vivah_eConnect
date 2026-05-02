// const {ObjectId} =require('mongodb');
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    unique: true ,
  },

  email: {
    type: String,
    required: true,
  },
  // isVerified: { type: Boolean, default: false },

  // otp: String,
  // otpExpiry: Date,
  // contact: {
  //   type: String,
  //   // required:true,
  // },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  role:{String
  }
});

const User = mongoose.model("User", userSchema);
export default User;
