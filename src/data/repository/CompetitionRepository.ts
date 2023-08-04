import axios from "axios";
import { axiosOptions } from "../../config/index";
import { BaseCompetition } from "../../domain/interfaces/interfaces";
import CompetitionEntity from "../../domain/entities/Competition";
import TeamEntity from "../../domain/entities/Team";
import { Team } from "../../domain/interfaces/teamInterfaces";
import { Competitions } from "../../domain/interfaces/competitionsInterfaces";

class CompetitionRepository implements BaseCompetition{

    #url:string;

    constructor(){
        this.#url= 'https://api.football-data.org/v4/competitions';
    }
    async getCompetition(competitionId:string){
        try {
            const result = await axios.get(`${this.#url}/${competitionId}`,axiosOptions);
            return result.data;
        } catch (error) {
            return new Error(`${error}`);
        }

    }
    async getTeams(competitionId:string):Promise<TeamEntity[] | Error>{
        const result = await axios.get<Competitions>(`${this.#url}/${competitionId}/teams`,axiosOptions);  
        if(!result.data){
            return new Error("No se han encontrado equipos para esta liga");
        }
        if(!result.data.teams){
            return new Error("La competencia no tiene equipos");
        }
        const newTeam = result.data.teams.map((team:Team)=> new TeamEntity({
            id:team.id || 0,
            logo:team.crest || "",
            mongoId:"",
            name:team.name ||"",
            shortName:team.shortName ||"",
            tla:team.tla ||""
        }));
        return newTeam;
        
    }

    
}

export default CompetitionRepository;