import axios from "axios";
import { axiosOptions } from "../../config/index.js";
import { BaseCompetition } from "../../domain/interfaces/interfaces.js";
import CompetitionEntity from "../../domain/entities/Competition";
import TeamEntity from "../../domain/entities/Team";
import { Team } from "../../domain/interfaces/teamInterfaces.js";

class CompetitionRepository extends BaseCompetition{

    #url:string;

    constructor(){
        super();
        this.#url= 'https://api.football-data.org/v4/competitions';
    }
    async getCompetition(competitionId:string){
        const result = await axios.get(`${this.#url}/${competitionId}`,axiosOptions);
        return new CompetitionEntity(result.data);
    }
    async getTeams(competitionId:string){
        const result = await axios.get(`${this.#url}/${competitionId}/teams`,axiosOptions);  
        if(!result.data){
            throw new Error("No se han encontrado equipos para esta liga");
        }
        return result.data.teams.map((team:Team)=> new TeamEntity(team));
    }

    
}

export default CompetitionRepository;