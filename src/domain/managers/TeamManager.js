import container from "../../../container.js"
import { competitions } from "../../helpers/apiData.js";
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
            const teams = await competitionM.getTeams(comp.code);
      
            if(!teams.length){
                throw new Error("No existen equipos para esta competicion");
            }
            
            const team = teams.find(team => team.getName().includes(teamName));
            return team;
            
        } catch (error) {
            console.log(error);
        }
        
    }

    async getTeamName(teamName){
        try {
            const competitionM = new CompetitionManager();
            let teamFinded = {};
            for await (const comp of competitions){
                const teams = await competitionM.getTeams(comp.code);
                if(!teams.length){
                    throw new Error("No existen equipos para esta competicion");
                }
                const team = teams.find(team => team.getName().includes(teamName));
                if(team){
                console.log("Competition: ",comp.name,"Equipo: ",team);
                //teamFinded = {...team};
                return;
                }
            }
            return teamFinded;
            
        } catch (error) {
            console.log(error);
        }
        
    }
    
    

}

export default TeamManager;