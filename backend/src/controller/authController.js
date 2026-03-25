import User from '../models/User.js';
import Profile from '../models/Profile.js';
import  { body, validationResult, check } from  "express-validator"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";



const signup = async (req,res)=>{   
  try {
   
      const { name, city, email, password, contact } = req.body;

       // ✅ check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
      errors: [{msg:"Email already registered"}],
      });
    }
         const hashedPassword = await bcrypt.hash(password, 12);
      
       const user = new User({
      name,
      city,
      email,
      password: hashedPassword,
      contact,
    });
      const savedUser = await user.save();
      console.log(savedUser);
   console.log("saved User successfully");
    res.status(201).json({
      success: true,
    });
         
    } catch(err){
       console.log(err);
      return res.status(500).json({ message: err.message });
        };
}


// export const loginLimiter = rateLimit({
//   windowMs: 30 * 60 * 1000, // 15 min
//   max: 5, // max 5 attempts
//  errors: [{msg:"Invalid email or password"}],
  //  // message: "Too many login attempts, try again later"
// });

const login= async(req,res,next)=>{
  try{
const {email, password}=req.body;
const user = await User.findOne({ email });
if (!user ) {
  console.log("not found");
  return res.status(400).json({
    success: false,
      errors: [{msg:"Invalid email or password"}],
  });
}

 const isMatch= await  bcrypt.compare(password,user.password);
if(!isMatch){
  console.log("wrong password");
    return res.status(401).json({
    success: false,
    errors: [{msg:"Invalid email or password"}],
  });
}
  console.log(user.name,"is logged In");
  

//Sign token
const accessToken = jwt.sign(
  { userId: user._id },  //payload
  // role:user.role
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

res.cookie("token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // false, true in production (HTTPS)
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  })
  .status(200)
  .json({
    message: "Login successful",
    success: true
  });
// return jwt.verify(token,process.env.JWT_SECRET);
// console.log("DONE");
  }
  catch(err){
    console.log(err);
    return res.status(500).json({message: err.message});
  }
 
}


const account= async(req,res,next)=>{
   try {
    console.log("fetching user detail");
    const user = await User.findById(req.userId).select("-Password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

      const profiles = await Profile.find({
      userId: req.userId
   });

  //  console.log(profiles);
    res.status(200).json({
      success: true,
      user,
      profiles
    });

  

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

const logout= async(req,res,next)=>{
  console.log("User Logging Out");
  try{
    res
  .clearCookie("token")
  .status(200)
  .json({ message: "Logged out successfully" });
  console.log("done");
  }catch(err){
    console.log(err);
    return err;
  }

}


export default {signup,login,logout,account};  // using signup without braces need to import one by one in router

/*Plans for authentication

s1: ON post signup convert password to hash and then store it to db using bcrypt  + 

s2: while post Login check

*/