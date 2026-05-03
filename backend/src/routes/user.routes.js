import express from 'express'
import userController from '../controller/userController.js'
import upload from "../config/cloudinary.js";

const userRouter = express.Router();



userRouter.post('/user',upload.array("imageURL", 5),userController.addUser);

userRouter.get('/pref/:profileId',userController.getPreferences);
userRouter.put('/pref/:profileId',userController.savePreferences);

userRouter.get('/user1',userController.getUser);
userRouter.put('/user/:id',userController.updateUser);
userRouter.get('/user1/:id',userController.getUserById);
userRouter.delete('/user/:id',userController.deleteUser);
userRouter.put('/user',userController.updateUser);

export default userRouter;