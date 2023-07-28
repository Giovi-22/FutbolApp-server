import axios from "axios";
import { axiosOptions } from "../../config/index";

import TeamEntity from "../../domain/entities/Team";
import { Team } from '../../domain/interfaces/teamInterfaces';
import { TeamRepository } from "../../domain/interfaces/repositories/teamReapository.interface";
import { teamModel } from '../models/teamModel';
import { TeamDto } from "../../domain/interfaces/dto.interfaces";

class TeamMongooseRepository implements TeamRepository{

    #url:string;

    constructor(){
        this.#url= 'https://api.football-data.org/v4/teams';
    }

    async create(team:TeamEntity){
        const newTeam = await teamModel.create<TeamEntity>(team);
        return new TeamEntity({
            id: newTeam.id,    
            name: newTeam.name,   
            shortName: newTeam.shortName,
            tla: newTeam.tla,    
            logo: newTeam.logo,
            mongoId:newTeam._id.toString(),
        });
    }

    async getTeam(teamId:number):Promise<TeamEntity | null>{
        const result = await teamModel.findOne<TeamEntity>({id:teamId});
        console.log("equipo en el repo: ",result)
        if(!result){
            return null;
        }
        const newId:string = result._id? result._id.toString() : "";
        return new TeamEntity({
            id:result.id,
            logo:result.logo,
            mongoId:newId,
            name:result.name,
            shortName:result.shortName,
            tla:result.tla
        })

    }
    /*
    async getTeam(teamId:number){
        const result = await axios.get(`${this.#url}/${teamId}`,axiosOptions);
        return new TeamEntity(result.data);
    }
    async getTeams(teamId:number):Promise<TeamEntity[]>{
        const result = await axios.get(`${this.#url}/${teamId}/teams`,axiosOptions);
        return result.data.teams.map((team:Team)=> new TeamEntity(team));
    }
    */
}

export default TeamMongooseRepository;