import express from 'express'
// import authController from './controller/authController'
import authController from '../controller/authController.js'
import authenticateJWT from '../middleware/jwt.js';

const authRouter = express.Router();

// authRouter.use('/',(req,res)=>{
//   console.log(req.url)
//   res.send('<h1> Welcome to auth Page</h1>')
// })


authRouter.post('/signup',authController.signup);
authRouter.post('/login',authController.login);
authRouter.get('/me',authenticateJWT, authController.account);
authRouter.post('/logout',authController.logout);

export default authRouter;