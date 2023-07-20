import { Competition, Competitions, Filters } from "../interfaces/competitionsInterfaces";


class CompetitionEntity implements Competitions{

    count;
    filters;
    competitions;


    constructor(props:Competitions){
        this.count = props.count;
        this.competitions = props.competitions;
        this.filters = props.filters;

    }

    getCompetitions():Competition[]{
        return this.competitions;
    }
    
}

export default CompetitionEntity;