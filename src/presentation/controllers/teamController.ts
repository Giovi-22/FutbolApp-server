import { NextFunction, Request,Response } from "express";
import TeamManager from "../../domain/managers/TeamManager";
import PlayerManager from "../../domain/managers/PlayerManager";
import MyErrors from "../../domain/Error";

class TeamController{

    static async getTeam(req:Request,res:Response,next:NextFunction){
        try {
            const teamNumber = Number(req.params.teamCode);
            const teamM = new TeamManager();
            const result = await teamM.getTeam(teamNumber);

            if(result instanceof MyErrors){
                return res.status(result.status).send({status:'failed',message:result.message});
            }
            return res.status(200).send({status:'success',message:'Team finded',data:result});

        } catch (error) {
            return next(error);
        }
    }

    static async getApiTeams(req:Request,res:Response,next:NextFunction){       
       try {
            const limit = +req.params.limit;
            const teamM = new TeamManager();
            const team = await teamM.getTeams(limit)
            if(team instanceof Error){
                res.status(404).send({status:"failed",message:team.message});
            }
            res.status(200).send({status:"success",data:"teams"});
        } catch (error) {
            const newError:string = `${error}`;
            return next(newError);
        }
    }

    static async getTeamByName(req:Request,res:Response,next:NextFunction){

        console.log("Team name: ",req.params.teamName)
        try {
            const teamName = req.params.teamName;   
            const manager = new TeamManager();
            const teams = await manager.getTeamByName(teamName);
            if(!teams){
                return res.status(200).send({status:"failed",message:"Teams don't found",data:[]});
            }
            return res.status(200).send({status:"success",message:"teams finded!",data:teams});
        } catch (error) {
            const newError:string = `${error}`;
            return next(newError);
        }
    }

    static async getListOfPlayers(req:Request,res:Response,next:NextFunction){
        try {
            const playersList = req.body.players;
            const playerM = new PlayerManager();
            const result = await playerM.getList(playersList);
            return res.status(200).send({status:'success',message:"The player list",data:result})
        } catch (error) {
            const newError:string = `${error}`;
            return next(newError);
        }
        
    }
    

}

export default TeamController;