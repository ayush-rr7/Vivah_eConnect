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
  },

  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    // required:true,
  },
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
