import container from "../../../container.js"
import Team from "../entities.js/Team.js";
import CompetitionManager from "./CompetitionManager.js";

class TeamManager{

    constructor(){
        this.TeamRepository= container.resolve('TeamRepository');
    }

    async getCompetition(teamId){
        return this.TeamRepository.getTeam(teamId);

    }
    async getTeamByName(teamName,competitionId){
        try {
            const competitionM = new CompetitionManager();
            const teams = await competitionM.getTeams(competitionId);
            if(!teams.lenght){
                throw new Error("No existen equipos para esta competicion");
            }
            const team = teams.filter(team => team.name.includes(teamName))
            return new Team(team);
        } catch (error) {
            console.log(error);
        }
        
    }

}

export default TeamManager;