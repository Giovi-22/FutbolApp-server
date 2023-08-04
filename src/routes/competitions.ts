import { Router } from "express";
import CompetitionController from "../presentation/controllers/competitionControllers";

const competitionRouter = Router();


competitionRouter.get('/competition/:cid',CompetitionController.getCompetition);
competitionRouter.get('/competition/:cid/teams',CompetitionController.getTeams);


export default competitionRouter;