
import MyErrors from "../Error";
import TeamEntity from "../entities/Team"
import Team from "../entities/Team"
import { Competition, Competitions, ErrorFootballData } from "./competitionsInterfaces"

export  interface BaseCompetition {
    getCompetition(cid:string,filter?:ApiFootballDataFilters):Promise<Competitions | MyErrors>;
    getTeams(cid:string):Promise<TeamEntity[] | MyErrors>;
    getStandings(competitionCode:string,filter?:ApiFootballDataFilters):Promise<Competitions | MyErrors>;
    getMatches(competitionCode:string,filter?:ApiFootballDataFilters):Promise<Competition | MyErrors>;
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
export interface ApiFootballDataFilters{
    season?:string | null,
    matchDay?:number | null
 }
export interface ObjectIndex{
    [key:string]:string
}

export interface UserToken{
    email:string,
    id?:string
}

