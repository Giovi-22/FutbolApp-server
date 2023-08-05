import { Team } from "./teamInterfaces";

export interface Competitions {
    count:        number;
    filters:      Filters;
    competitions: Competition[];
    season?:      Season;
    teams?:       Team[];
}

export interface Competition {
    id:                       number;
    area:                     Area;
    name:                     string;
    code:                     string;
    type:                     Type;
    emblem:                   string;
    plan:                     Plan;
    currentSeason:            CurrentSeason;
    numberOfAvailableSeasons: number;
    lastUpdated:              Date;
}

export interface Area {
    id:   number;
    name: string;
    code: string;
    flag: null | string;
}

export interface CurrentSeason {
    id:              number;
    startDate:       Date;
    endDate:         Date;
    currentMatchday: number;
    winner:          Winner | null;
}

export interface Winner {
    id:          number;
    name:        string;
    shortName:   string;
    tla:         string;
    crest:       string;
    address:     string;
    website:     string;
    founded:     number;
    clubColors:  string;
    venue:       string;
    lastUpdated: Date;
}

export interface Season {
    id:              number;
    startDate:       Date;
    endDate:         Date;
    currentMatchday: number;
    winner:          null;
}


export enum Plan {
    TierOne = "TIER_ONE",
}

export enum Type {
    Cup = "CUP",
    League = "LEAGUE",
}

export interface Filters {
    client: string;
}

export interface ErrorFootballData{
    message:string,
    errorCode:number
}