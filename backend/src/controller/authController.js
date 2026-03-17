import User from '../models/User.js';
import Profile from '../models/Profile.js';
import  { body, validationResult, check } from  "express-validator"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";



const signup = async (req,res)=>{
  
   
  try {
   
    const {
        Name,
        City,
        Email,
        Password,
        Contact,
      }= req.body;

         const hashedPassword = await bcrypt.hash(Password, 12);
      const user = new User({
        Name,
        City,
        Email,
        Password: hashedPassword,
        Contact,
      });
      const savedUser = await user.save();
      console.log(savedUser);
   console.log("saved User successfully");
    res.status(201).json(savedUser);
         
          // res.redirect("/login");
    } catch(err){
       console.log(err);
      return res.status(500).json({ message: err.message });
        };
}


const login= async(req,res,next)=>{
  try{
    const {Email, Password}=req.body;
   

const user = await User.findOne({ Email });
if (!user ) {
  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
}


//   req.session.isLoggedIn = true;
//   req.session.user = user;
//   await req.session.save();
  console.log(user.Name,"is logged In");
//   res.redirect("/");
// };



// jwt.sign() → create token
// jwt.verify() → verify token
// jwt.decode() → read token payload
// TokenExpiredError → handle expiry
// JsonWebTokenError → handle invalid token


//Sign token
const accessToken = jwt.sign(
  { userId: user._id },  //payload
  // role:user.role
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

// res.status(200).json({
//   message: "Login successful",
//   success: true,
//   token: accessToken
// });

res.cookie("token", accessToken, {
    httpOnly: true,
    secure: false, // true in production (HTTPS)
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  })
  .status(200)
  .json({
    message: "Login successful",
    success: true
  });
// return jwt.verify(token,process.env.JWT_SECRET);
console.log("DONE");
  }
  catch(err){
    console.log(err);
    return res.status(500).json({message: err.message});
  }
 
}


const account= async(req,res,next)=>{
   try {
    console.log(req.userId);
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
  console.log("I'm here");
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





// const { body, validationResult, check } = require("express-validator");
// const User = require("../models/user");

// const bcrypt = require("bcryptjs");
// const user = require("../models/user");


// exports.postSignup =
//  [
//   // Validation middleware
//   check("email").isEmail().withMessage("Please enter a valid email address."),

//   check("password")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters long."),

//   // Controller logic
//   (req, res, next) => {
//     const { firstName, lastName, city, email, password, userType } = req.body;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).render("auth/signup", {
//         isLoggedIn: false,
//         errors: errors.array(),
//         oldInput: { firstName, lastName, email, password, userType },
//         user: {},
//       });
//     }

//     bcrypt.hash(password, 12).then((hashedPassword) => {
//       const user = new User({
//         firstName,
//         lastName,
//         city,
//         email,
//         password: hashedPassword,
//         userType,
//       });
//       // console.log(user);
//       user
//         .save()
//         .then(() => {
//           console.log("saved successfully");
//           res.redirect("/login");
//         })
//         .catch((err) => {
//           return res.status(422).render("auth/signup", {
//             isLoggedIn: false,
//             errors: [err.message],

//             oldInput: { firstName, lastName, email, userType },
//             user: {},
//           });
//         });
//     });
//   },
// ];

// exports.postLogin = async (req, res, next) => {
//   // console.log(req.body);
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   console.log(user);

//   if (!user) {
//     return res.status(422).render("auth/login", {
//       isLoggedIn: false,
//       errors: ["User does not exist"],
//       // oldInput: {email}
//     });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(422).render("auth/login", {
//       isLoggedIn: false,
//       errors: ["Invalid password"],
//       // oldInput:{email}
//     });
//   }
//   console.log(user);

//   req.session.isLoggedIn = true;
//   req.session.user = user;
//   await req.session.save();
//   console.log(user);
//   res.redirect("/");
// };
// exports.postLogout = (req, res, next) => {
//   req.session.destroy(() => {
//     res.redirect("/login");
//   });
// };

// exports.postProfile = (req, res) => {
//   const user = req.session.user;
//   res.render("auth/profile", { isLoggedIn: req.isLoggedIn, user: user });
// };
