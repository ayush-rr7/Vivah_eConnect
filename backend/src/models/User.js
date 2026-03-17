// const {ObjectId} =require('mongodb');
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },
  Contact: {
    type: String,
    // required:true,
  },
  Password: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
  },
  Role:{String
  }
});

const User = mongoose.model("User", userSchema);
export default User;
