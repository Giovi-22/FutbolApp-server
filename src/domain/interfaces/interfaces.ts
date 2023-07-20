
import Team from "../entities/Team"
import { Competitions } from "./competitionsInterfaces"

export abstract class BaseCompetition {
    constructor(){}
    
    abstract getCompetition(cid:string):Promise<Competitions>;
    abstract getTeams(cid:string):Promise<Team>;
}

export abstract class BaseTeam {
    constructor(){}
    
    abstract getCompetition(cid:string):Promise<void>;
    abstract getTeamByName(teamName:string,competitionId:number):Promise<void>;
}