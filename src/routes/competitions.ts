import { Router } from "express";
import CompetitionController from "../presentation/controllers/competitionControllers";

const competitionRouter = Router();


competitionRouter.get('/competition/:cid',CompetitionController.getCompetition);
competitionRouter.get('/competition/:cid/standings',CompetitionController.getStandings);
competitionRouter.get('/competition/:cid/teams',CompetitionController.getTeams);
competitionRouter.get('/competition/:cid/matches',CompetitionController.getMatches);

export default competitionRouter;