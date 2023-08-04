import container from "../../container"
import { BaseCompetition } from "../interfaces/interfaces";
import TeamEntity from '../entities/Team';



class CompetitionManager{

    #CompetitionRepository:BaseCompetition;

    constructor(){
        this.#CompetitionRepository = container.resolve('competitionRepository');
    }

    async getCompetition(competitionCode:string){
        return this.#CompetitionRepository.getCompetition(competitionCode);
    }

    async getTeams(competitionId:string):Promise<TeamEntity[] | Error>{
        return this.#CompetitionRepository.getTeams(competitionId);
    }

}

export default CompetitionManager;