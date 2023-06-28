import axios from "axios";
import { axiosOptions } from "../../config/index.js";

import Team from "../../domain/entities.js/Team.js";

class TeamRepository{

    constructor(){
        this.url= 'https://api.football-data.org/v4/teams';
    }
    async getTeam(teamId){
        const result = await axios.get(`${this.url}/${teamId}`,axiosOptions);
        return new Team(result.data);
    }
    async getTeams(teamId){
        const result = await axios.get(`${this.url}/${teamId}/teams`,axiosOptions);
        return result.data.teams.map(team=> new Team(team));
    }
}

export default TeamRepository;