import mongoose from "mongoose";
//otp1
const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiresAt: Date,
});


export default mongoose.model("Otp", otpSchema);