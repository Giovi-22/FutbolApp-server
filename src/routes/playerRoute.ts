import { Router } from "express";
import PlayerController from "../presentation/controllers/playerController";

const playerRouter = Router();


playerRouter.get('/player/:pid',PlayerController.getById);
playerRouter.get('/player/',PlayerController.getListOfPlayers);

export default playerRouter;