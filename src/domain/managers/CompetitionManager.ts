import container from "../../container"
import { ApiFootballDataFilters, BaseCompetition } from "../interfaces/interfaces";
import TeamEntity from '../entities/Team';
import { ErrorFootballData } from "../interfaces/competitionsInterfaces";



class CompetitionManager{

    #CompetitionRepository:BaseCompetition;

    constructor(){
        this.#CompetitionRepository = container.resolve('competitionRepository');
    }

    async getCompetition(competitionCode:string,filter?:ApiFootballDataFilters){
        return this.#CompetitionRepository.getCompetition(competitionCode,filter);
    }

    async getCompetitionStanding(competitionCode:string,filter:ApiFootballDataFilters){
        return this.#CompetitionRepository.getStandings(competitionCode,filter);
    }

    async getMatches(competitionCode:string,filter?:ApiFootballDataFilters){
        return this.#CompetitionRepository.getMatches(competitionCode,filter);//265470
    }

    async getTeams(competitionId:string){
        return this.#CompetitionRepository.getTeams(competitionId);
    }

}

export default CompetitionManager;