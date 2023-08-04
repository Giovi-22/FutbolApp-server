import { Response,Request, NextFunction } from "express";

import CompetitionManager from "../../domain/managers/CompetitionManager";



class CompetitionController{

    static async getCompetition(req:Request,res:Response, next:NextFunction){
        try {
            
            console.log("params: ",req.params.cid)
            const manager = new CompetitionManager();
            const competition = await manager.getCompetition(req.params.cid);
            if(competition instanceof Error){
                return res.status(400).send({status:'failed',messge:'Competition not found'});
            }
            return res.status(200).send({status:"success",data:competition});
        } catch (error) {
           return next(error);
        }
    }
    
    static async getTeams(req:Request,res:Response){
        try {
            /*
            console.log("dentro de competitions/cid/teams")
            const competitionId = req.params.cid;
            console.log("params: ",competitionId);
            const manager = new CompetitionManager();
            const teams = await manager.getTeams(competitionId);
            console.log(teams)
            res.status(200).send({status:"success",data:teams});
            */
        } catch (error) {
            console.log(error);
        }
    }
}

export default CompetitionController;