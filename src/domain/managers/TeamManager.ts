
import container from "../../container";
import TeamFootballDataRepository from "../../data/repository/TeamFootballDataRepository";
import TeamMongooseRepository from "../../data/repository/TeamRepository";
import TeamEntity from "../entities/Team";
import { ApiFilter, BaseCompetition } from "../interfaces/interfaces";
import { TeamRepository } from "../interfaces/repositories/teamReapository.interface";
import { AwilixContainer } from 'awilix';

class TeamManager implements TeamRepository{

    #TeamRepository:TeamMongooseRepository;
    #TeamFootballRepo:TeamFootballDataRepository;
    constructor(){
        this.#TeamRepository= new TeamMongooseRepository;
        this.#TeamFootballRepo = new TeamFootballDataRepository;
    }

    async create(team:TeamEntity)
    {
        return this.#TeamRepository.create(team);
    }

    async saveTeam(team:TeamEntity){
        
    }

    async getTeams(limit:number){
        const result = await this.#TeamFootballRepo.getTeams(limit);
        if(result instanceof Error){
            return result;
        }
        for await(const team of result){
            const result = await this.findOne(team.id);
            if(!result){
                const result = await this.create(team);
                console.log("team creado ",result.name);
            }
        }
        return;
    }

    async findOne(teamId:number){
        return this.#TeamRepository.getTeam(teamId);
    }
/*
    async getCompetition(teamId:number){
        return this.#TeamRepository.getTeam(teamId);
    }
*/
    async getTeamByName(teamName:string):Promise<TeamEntity[] | null>{
           return await this.#TeamRepository.findByName(teamName);
        
    }
/*
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