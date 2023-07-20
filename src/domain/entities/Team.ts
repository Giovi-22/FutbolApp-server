import { Team } from "../interfaces/teamInterfaces";

class TeamEntity{
        #Team:Team;

    constructor(props:Team){
        this.#Team = props;
    }

    getName(){
        return this.#Team.name;
    }
}
export default TeamEntity;