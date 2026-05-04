// // import "./config/cloudinary.js";

import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import http from 'http'
import mongoose from 'mongoose';
import cors from 'cors';
import  authRouter from './routes/auth.routes.js' ;
import  userRouter from './routes/user.routes.js' ;
import matchRouter from './routes/match.routes.js';
import  connectionRouter from './routes/connection.routes.js' ;
import  messageRouter from  './routes/message.routes.js' ;
import authenticateJWT from './middleware/jwt.js';
import cookieParser from "cookie-parser";


const app= express();

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, // Keep the server attempting to connect for 5 seconds
    socketTimeoutMS: 45000,
})
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("Connection error:", err));

app.use(cors({
  origin: ["http://localhost:5173","https://vivah-econnect.vercel.app" ],
  credentials: true
}));
// app.options("*", cors()); 


app.use(express.json());  //for parsing json data
app.use(express.urlencoded({ extended: true }));//for parsing form data 
app.use(cookieParser());  //for parsing jwt 


app.use('/auth',authRouter);
//protected route
app.use('/api',authenticateJWT, userRouter);
app.use('/matches',authenticateJWT, matchRouter);
app.use('/connection',authenticateJWT, connectionRouter);
app.use('/messages', messageRouter);



export default app;
