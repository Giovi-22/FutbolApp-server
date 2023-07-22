import axios from "axios";
import { axiosOptions } from "../../config/index";

import TeamEntity from "../../domain/entities/Team";
import { Team } from '../../domain/interfaces/teamInterfaces';

class TeamRepository{

    #url:string;

    constructor(){
        this.#url= 'https://api.football-data.org/v4/teams';
    }
    async getTeam(teamId:number){
        const result = await axios.get(`${this.#url}/${teamId}`,axiosOptions);
        return new TeamEntity(result.data);
    }
    async getTeams(teamId:number):Promise<TeamEntity[]>{
        const result = await axios.get(`${this.#url}/${teamId}/teams`,axiosOptions);
        return result.data.teams.map((team:Team)=> new TeamEntity(team));
    }
}

export default TeamRepository;