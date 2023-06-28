import CompetitionManager from "../../domain/managers/CompetitionManager.js";


class CompetitionController{

    static async getCompetition(req,res){
        try {
            console.log("params: ",req.params.cid)
            const manager = new CompetitionManager();
            const competition = await manager.getCompetition(req.params.cid);
            res.status(200).send({status:"success",data:competition});
            
        } catch (error) {
            console.log(error);
        }
    }
    
    static async getTeams(req,res){
        try {
            const competitionId = req.params.cid;
            console.log("params: ",competitionId);
            const manager = new CompetitionManager();
            const teams = await manager.getTeams(competitionId);
            console.log(teams)
            res.status(200).send({status:"success",data:teams});
            
        } catch (error) {
            console.log(error);
        }
    }
}

export default CompetitionController;