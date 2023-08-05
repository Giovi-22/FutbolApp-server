import axios, { AxiosError } from "axios";
import { axiosOptions } from "../../config/index";

import TeamEntity from "../../domain/entities/Team";
import { Team } from '../../domain/interfaces/teamInterfaces';
import MyErrors from "../../domain/Error";

class TeamFootballDataRepository {

    #url:string;

    constructor(){
        this.#url= 'https://api.football-data.org/v4/teams';
    }

    async getTeam(teamId:number):Promise<Team | MyErrors>{
            console.log("el team id es: ",teamId)
            const result = await axios.get(`${this.#url}/${teamId}`,axiosOptions);
            if(result instanceof AxiosError){
                const newError = new MyErrors(result.data.message,result.data.errorCode)
                return newError
            }
            return result.data;
    }

    async getTeams(limit:number=100):Promise<TeamEntity[] | MyErrors>{
            const result = await axios.get(`${this.#url}?limit=${limit}`,axiosOptions);
            if(result instanceof AxiosError){
                const newError = new MyErrors(result.data.message,result.data.errorCode)
                return newError
            }
            return result.data.teams.map((team:Team)=> new TeamEntity({
                id:team?.id || 0,
                logo:team.crest || "",
                mongoId:"",
                name:team.name ||"",
                shortName:team.shortName || "",
                tla:team.tla || "",

        }));
    }

}

export default TeamFootballDataRepository;