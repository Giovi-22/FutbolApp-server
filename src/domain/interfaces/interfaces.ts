
import TeamEntity from "../entities/Team"
import Team from "../entities/Team"
import { Competitions } from "./competitionsInterfaces"

export abstract class BaseCompetition {
    constructor(){}
    
    abstract getCompetition(cid:string):Promise<Competitions>;
    abstract getTeams(cid:string):Promise<TeamEntity[] | Error>;
}

export abstract class BaseTeam {
    constructor(){}
    
    abstract getCompetition(cid:string):Promise<void>;
    abstract getTeamByName(teamName:string,competitionId:number):Promise<void>;
}

export interface ApiFilter{
    field:string,
    value:string 
}

export interface ObjectIndex{
    [key:string]:string
}

export interface UserToken{
    email:string,
    id?:string
}

