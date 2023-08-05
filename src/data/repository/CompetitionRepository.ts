import axios, { AxiosError } from "axios";
import { axiosOptions } from "../../config/index";
import { ApiFootballDataFilters, BaseCompetition } from "../../domain/interfaces/interfaces";
import TeamEntity from "../../domain/entities/Team";
import { Team } from "../../domain/interfaces/teamInterfaces";
import { Competitions, ErrorFootballData } from "../../domain/interfaces/competitionsInterfaces";
import { getUrlWithParams } from "../../helpers/functions";
import MyErrors from "../../domain/Error";

class CompetitionRepository implements BaseCompetition{

    #url:string;

    constructor(){
        this.#url= 'https://api.football-data.org/v4/competitions';
    }
    async getCompetition(competitionId:string,filter?:ApiFootballDataFilters){
            const url = `${this.#url}/${competitionId}`;
            const newUrl = getUrlWithParams(url,filter);
            const result = await axios.get(`${newUrl}`,axiosOptions);
            if(result instanceof AxiosError){
                const newError = new MyErrors(result.data.message,result.data.errorCode)
                return newError
            }
            return result.data;
    }

    async getStandings(competitionCode:string,filter?:ApiFootballDataFilters){
            const url = `${this.#url}/${competitionCode}/standings`;
            const newUrl = getUrlWithParams(url,filter);
            const result = await axios.get(`${newUrl}`,axiosOptions);
            if(result instanceof AxiosError){
                const newError = new MyErrors(result.data.message,result.data.errorCode)
                return newError
            }
            return result.data;
    }

    async getMatches(competitionCode:string,filter?:ApiFootballDataFilters){
            const url = `${this.#url}/${competitionCode}/matches`;
            const newUrl = getUrlWithParams(url,filter);
            const result = await axios.get(`${newUrl}`,axiosOptions);
            if(result instanceof AxiosError){
                const newError = new MyErrors(result.data.message,result.data.errorCode)
                return newError
            }
            return result.data;
    }

    async getTeams(competitionId:string){

            const result = await axios.get(`${this.#url}/${competitionId}/teams`,axiosOptions);  
            if(result instanceof AxiosError){
                const newError = new MyErrors(result.data.message,result.data.errorCode)
                return newError
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


    
