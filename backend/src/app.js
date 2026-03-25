// // import "./config/cloudinary.js";
import express from 'express';
import http from 'http'
import mongoose from 'mongoose';
import cors from 'cors';
import  authRouter from './routes/auth.routes.js' ;
import  userRouter from './routes/user.routes.js' ;
import  connectionRouter from './routes/connection.routes.js' ;
import  messageRouter from  './routes/message.routes.js' ;
import authenticateJWT from './middleware/jwt.js';
import cookieParser from "cookie-parser";


const app= express();

import dotenv from 'dotenv'
dotenv.config();
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, // Keep the server attempting to connect for 5 seconds
    socketTimeoutMS: 45000,
})
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("Connection error:", err));



app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());  //for parsing json data
app.use(express.urlencoded());//for parsing form data 
app.use(cookieParser());  //for parsing jwt 


app.use('/auth',authRouter);
//protected route
app.use('/api',authenticateJWT, userRouter);
app.use('/connection',authenticateJWT, connectionRouter);
app.use('/messages', messageRouter);



export default app;