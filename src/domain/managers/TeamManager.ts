

import TeamFootballDataRepository from "../../data/repository/TeamFootballDataRepository";
import TeamMongooseRepository from "../../data/repository/TeamRepository";
import TeamEntity from "../entities/Team";
import { TeamRepository } from "../interfaces/repositories/teamReapository.interface";

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

    async getTeam(teamCode:number){
        return this.#TeamFootballRepo.getTeam(teamCode);
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

    async getTeamByName(teamName:string):Promise<TeamEntity[] | null>{
           return await this.#TeamRepository.findByName(teamName);
        
    }

}

export default TeamManager;