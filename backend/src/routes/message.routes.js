import express from 'express';
import { getChatHistory } from '../controller/messageController.js';
import authenticateJWT from '../middleware/jwt.js';


const  messageRouter = express.Router();

// // JWT protected route
messageRouter.get('/now',authenticateJWT, getChatHistory);

export default messageRouter;