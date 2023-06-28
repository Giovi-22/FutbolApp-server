import { Router } from "express";
import CompetitionController from "../presentation/controllers/competitionControllers.js";

const competitionRoute = Router();


competitionRoute.get('/competition/:cid',CompetitionController.getCompetition);
competitionRoute.get('/competition/:cid/teams',CompetitionController.getTeams);
/*
competitionRoute.get('/teams/:name',(req,res)=>{
    try {
        const teamName = req.params.name;
        competitions.forEach((competition)=>{
            
        })
    } catch (error) {
        
    }
})
*/

export default competitionRoute;