
import container from "../../container";
import TeamMongooseRepository from "../../data/repository/TeamRepository";
import TeamEntity from "../entities/Team";
import { ApiFilter, BaseCompetition } from "../interfaces/interfaces";
import { TeamRepository } from "../interfaces/repositories/teamReapository.interface";
import { AwilixContainer } from 'awilix';

class TeamManager implements TeamRepository{

    #TeamRepository:TeamMongooseRepository;

    constructor(){
        this.#TeamRepository= new TeamMongooseRepository;
    }

    async create(team:TeamEntity)
    {
        return this.#TeamRepository.create(team);
    }

    async saveTeam(team:TeamEntity){
        
    }

    async findOne(teamId:number){
        return this.#TeamRepository.getTeam(teamId);
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