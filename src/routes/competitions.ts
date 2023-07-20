import { Router } from "express";
import CompetitionController from "../presentation/controllers/competitionControllers";

const competitionRoute = Router();


competitionRoute.get('/competition/:cid',CompetitionController.getCompetition);
competitionRoute.get('/competition/:cid/teams',CompetitionController.getTeams);


export default competitionRoute;