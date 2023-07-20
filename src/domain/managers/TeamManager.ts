
import container from "../../container";
import { competitions } from "../../helpers/apiData";
import { BaseCompetition } from "../interfaces/interfaces";
import CompetitionManager from "./CompetitionManager";
import { AwilixContainer } from 'awilix';

class TeamManager{

    #TeamRepository:AwilixContainer<BaseCompetition>;

    constructor(){
        this.#TeamRepository= container.resolve('teamRepository');
    }
/*
    async getCompetition(teamId:number){
        return this.#TeamRepository.getTeam(teamId);
    }
*/
/*
    async getTeamByName(teamName:string,competitionId:number){
        try {
            const competitionM = new CompetitionManager();
            const teams = await competitionM.getTeams(teamName);
      
            if(!teams){
                throw new Error("No existen equipos para esta competicion");
            }
            
            const team = teams.find(team => team.getName().includes(teamName));
            return team;
            
        } catch (error) {
            console.log(error);
        }
        
    }

    async getTeamName(teamName:string){
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
    
    */

}

export default TeamManager;