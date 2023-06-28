import TeamManager from "../../domain/managers/TeamManager.js";

class TeamController{

    static async getTeam(req,res){
        console.log(req.params)
        try {
            const teamName = req.params.teamName;
            const competitionId = req.params.body.competitionId;
            console.log("params: ",teamName)
            const manager = new TeamManager();
            const team = await manager.getTeamByName(teamName,competitionId);
            res.status(200).send({status:"success",data:team});
            
        } catch (error) {
            console.log(error);
        }
    }
    

}

export default TeamController;