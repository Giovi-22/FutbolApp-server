import container from "../../container.js"
import { BaseCompetition } from "../interfaces/interfaces.js";
import TeamEntity from '../entities/Team';



class CompetitionManager{

    #CompetitionRepository:BaseCompetition;

    constructor(){
        this.#CompetitionRepository = container.resolve('competitionRepository');
    }

    async getTeams(competitionId:string):Promise<TeamEntity[] | Error>{
        return this.#CompetitionRepository.getTeams(competitionId);
    }

}

export default CompetitionManager;