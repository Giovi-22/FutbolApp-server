import { Router } from "express";
import TeamController from "../presentation/controllers/teamController";

const teamRouter = Router();

teamRouter.get('/team/:teamCode',TeamController.getTeam);
//teamRouter.get('/team/:limit',TeamController.getApiTeams);
teamRouter.get('/team/name/:teamName',TeamController.getTeamByName);
teamRouter.post('/players',TeamController.getListOfPlayers);


export default teamRouter;