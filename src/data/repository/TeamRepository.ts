
import TeamEntity from "../../domain/entities/Team";

import { TeamRepository } from "../../domain/interfaces/repositories/teamReapository.interface";
import { teamModel } from '../models/teamModel';

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
        console.log("el team id es: ",teamId)
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

    async findByName(teamName:string):Promise<TeamEntity[] | null>{
            const result = await teamModel.find({name:{$regex:teamName,$options:"i"}});
            console.log("Los resultados: ",result);
            if(!result.length){
                return null;
            }
            return result.map(team=> new TeamEntity(team));
    }

}

export default TeamMongooseRepository;