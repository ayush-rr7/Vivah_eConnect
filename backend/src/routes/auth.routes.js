import express from 'express'
import authController from '../controller/authController.js'
import authenticateJWT from '../middleware/jwt.js';
import { signupValidation, loginValidator } from "../validators/userValidator.js";
import { validate } from "../middleware/validate.js";
const authRouter = express.Router();

authRouter.post('/signup',signupValidation, validate,authController.signup);
authRouter.post('/sendOtp',authController.sendOtp);
authRouter.post('/verifyOtp',authController.verifyOtp);

authRouter.post('/login',loginValidator, validate, authController.login);
authRouter.get('/me',authenticateJWT, authController.account);
authRouter.post('/logout',authController.logout);

export default authRouter;