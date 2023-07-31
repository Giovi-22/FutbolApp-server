import { Request,Response } from "express";
import TeamManager from "../../domain/managers/TeamManager";

class TeamController{

    static async getTeams(req:Request,res:Response){       
       try {
            const limit = +req.params.limit;
            const teamM = new TeamManager();
            const team = await teamM.getTeams(limit)
            if(team instanceof Error){
                res.status(404).send({status:"failed",message:team.message});
            }
            res.status(200).send({status:"success",data:"teams"});
        } catch (error) {
            console.log(error);
        }
    }

    static async getTeamByName(req:Request,res:Response){

        console.log("Team name: ",req.params)
        try {
            const teamName = req.params.teamName;   
            const manager = new TeamManager();
            const teams = await manager.getTeamByName(teamName);
            if(!teams){
                res.status(404).send({status:"failed",message:"Teams don't found"});
            }
            res.status(200).send({status:"success",message:"teams finded!",data:teams});
        } catch (error) {
            console.log(error);
        }
    }
    

}

export default TeamController;