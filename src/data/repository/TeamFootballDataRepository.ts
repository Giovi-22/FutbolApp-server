import axios, { AxiosError } from "axios";
import { axiosOptions } from "../../config/index";

import TeamEntity from "../../domain/entities/Team";
import { Team } from '../../domain/interfaces/teamInterfaces';

class TeamFootballDataRepository {

    #url:string;

    constructor(){
        this.#url= 'https://api.football-data.org/v4/teams';
    }

    async getTeams(limit:number=100):Promise<TeamEntity[] | Error>{
        try {
            const result = await axios.get(`${this.#url}?limit=${limit}`,axiosOptions);
            return result.data.teams.map((team:Team)=> new TeamEntity({
                id:team?.id || 0,
                logo:team.crest || "",
                mongoId:"",
                name:team.name ||"",
                shortName:team.shortName || "",
                tla:team.tla || "",

        }));
        } catch (error) {
            return new Error(`${error}`);
        }
        
    }

}

export default TeamFootballDataRepository;