import axios from "axios";
import { axiosOptions } from "../../config/index.js";
import Competition from "../../domain/entities.js/Competition.js";
import Team from "../../domain/entities.js/Team.js";

class CompetitionRepository{

    constructor(){
        this.url= 'https://api.football-data.org/v4/competitions';
    }
    async getCompetition(competitionId){
        const result = await axios.get(`${this.url}/${competitionId}`,axiosOptions);
        return new Competition(result.data);
    }
    async getTeams(competitionId){
        const result = await axios.get(`${this.url}/${competitionId}/teams`,axiosOptions);  
        if(!result.data){
            throw new Error("No se han encontrado equipos para esta liga");
        }
        return result.data.teams.map(team=> new Team(team));
    }

    
}

export default CompetitionRepository;