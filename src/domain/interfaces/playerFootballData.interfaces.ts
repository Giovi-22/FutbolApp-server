export interface Player {
    id:          number;
    name:        string;
    firstName:   string;
    lastName:    string;
    dateOfBirth: string;
    nationality: string;
    section:     string;
    position:    string;
    shirtNumber: number;
    lastUpdated: string;
    currentTeam?: CurrentTeam;
}

export interface CurrentTeam {
    area:                Area;
    id:                  number;
    name:                string;
    shortName:           string;
    tla:                 string;
    crest:               string;
    address:             string;
    website:             string;
    founded:             number;
    clubColors:          string;
    venue:               string;
    runningCompetitions: RunningCompetition[];
    contract:            Contract;
}

export interface Area {
    id:   number;
    name: string;
    code: string;
    flag: string;
}

export interface Contract {
    start: string;
    until: string;
}

export interface RunningCompetition {
    id:     number;
    name:   string;
    code:   string;
    type:   string;
    emblem: string;
}
