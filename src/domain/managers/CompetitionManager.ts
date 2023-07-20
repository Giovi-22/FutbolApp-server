import container from "../../container.js"
import { BaseCompetition } from "../interfaces/interfaces.js";
import TeamEntity from '../entities/Team';



class CompetitionManager{

    #CompetitionRepository:BaseCompetition;

    constructor(){
        this.#CompetitionRepository = container.resolve('competitionRepository');
    }
/*
    async getCompetition(competitionId:string){
        return this.#CompetitionRepository.getCompetition(competitionId);
    }
    async getTeams(competitionId:string):Promise<TeamEntity[]>{
        return this.#CompetitionRepository.getTeams(competitionId);
    }
    */
}

export default CompetitionManager;