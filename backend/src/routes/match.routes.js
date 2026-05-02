import express from "express";
import matchController from "../controller/matchController.js";


const matchRouter = express.Router();

matchRouter.get("/:profileId",  matchController.fetchMatches);

export default matchRouter;

