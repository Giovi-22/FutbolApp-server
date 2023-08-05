import { Response,Request, NextFunction } from "express";

import CompetitionManager from "../../domain/managers/CompetitionManager";
import MyErrors from "../../domain/Error";



class CompetitionController{

    static async getCompetition(req:Request,res:Response, next:NextFunction){
        try {
            console.log("dentro de competition route, buscando los equipos de las competiciones")
            console.log("params: ",req.params.cid)
            const filter = req.query;
            console.log("Los filtros son: ",filter)
            const manager = new CompetitionManager();
            const competition = await manager.getCompetition(req.params.cid,filter);
            if(competition instanceof MyErrors){
                return res.status(competition.status).send({status:'failed',message:competition.message});
            }
            console.log("los resultados: ",competition);
            return res.status(200).send({status:"success",message:"Competitions finded",data:competition});
        } catch (error) {
           return next(error);
        }
    }

    static async getStandings(req:Request,res:Response, next:NextFunction){
        try {
            
            console.log("params: ",req.params.cid)
            const filter = req.query;
            console.log("Los filtros son: ",filter)
            const manager = new CompetitionManager();
            const competition = await manager.getCompetitionStanding(req.params.cid,filter);
            if(competition instanceof MyErrors){
                return res.status(competition.status).send({status:'failed',message:competition.message});
            }
            return res.status(200).send({status:"success",message:"Standings finded",data:competition});
        } catch (error) {
           return next(error);
        }
    }

    static async getMatches(req:Request,res:Response, next:NextFunction){
        try {
            
            console.log("params: ",req.params.cid)
            const filter = req.query;
            console.log("Los filtros son: ",filter)
            const manager = new CompetitionManager();
            const matches = await manager.getMatches(req.params.cid,filter);
            if(matches instanceof MyErrors){
                return res.status(matches.status).send({status:'failed',message:matches.message});
            }
            return res.status(200).send({status:"success",message:"Matches finded",data:matches});
        } catch (error) {
           return next(error);
        }
    }
    
    static async getTeams(req:Request,res:Response, next:NextFunction){
        try {
            
            console.log("dentro de competitions/cid/teams")
            const competitionId = req.params.cid;
            console.log("params: ",competitionId);
            const manager = new CompetitionManager();
            const teams = await manager.getTeams(competitionId);
            if(teams instanceof MyErrors){
                return res.status(teams.status).send({status:'failed',message:teams.message});
            }
            console.log(teams)
            return res.status(200).send({status:"success",message:"Teams finded",data:teams});
            
        } catch (error) {
            return next(error);
        }
    }
   
}

export default CompetitionController;