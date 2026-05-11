import express from 'express'
import connectionController from '../controller/connectionController.js'


const connectionRouter = express.Router();

connectionRouter.get('/',connectionController.getConnection);
connectionRouter.post('/request',connectionController.connectionRequest);
connectionRouter.patch('/respond/:connectionId',connectionController.respondConnection);
// connectionRouter.delete('/remove',connectionController.RemoveConnection);

export default connectionRouter;