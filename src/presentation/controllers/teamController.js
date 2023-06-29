import TeamManager from "../../domain/managers/TeamManager.js";

class TeamController{

    static async getTeam(req,res){
        console.log("dentro de getTeam")
        console.log(req.params)
        try {
            const teamName = req.params.teamName;   
            const competitionId = req.body.competitionId;
            console.log("params: ",teamName);
            console.log("body: ",req.body);
            const manager = new TeamManager();
            const team = await manager.getTeamByName(teamName,competitionId);
            console.log("el equipo es: ",team); 
            res.status(200).send({status:"success",data:team});
            
        } catch (error) {
            console.log(error);
        }
    }

    static async getTeamName(req,res){

        console.log("Team name: ",req.params)
        try {
            const teamName = req.params.teamName;   
            const manager = new TeamManager();
            const team = await manager.getTeamName(teamName);
            console.log("el equipo es: ",team); 
            res.status(200).send({status:"success",data:team});
            
        } catch (error) {
            console.log(error);
        }
    }
    

}

export default TeamController;