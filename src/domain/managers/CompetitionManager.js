import container from "../../../container.js"

class CompetitionManager{

    constructor(){
        this.CompetitionRepository= container.resolve('CompetitionRepository');
    }

    async getCompetition(competitionId){
        return this.CompetitionRepository.getCompetition(competitionId);

    }
    async getTeams(competitionId){
        return this.CompetitionRepository.getTeams(competitionId);
    }
}

export default CompetitionManager;