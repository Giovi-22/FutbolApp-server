import mongoose from "mongoose";
import { Area } from "./competitionsInterfaces";
import { Coach, Squad, Team } from './teamInterfaces';

export interface TeamDto{
    id:                  number;
    name:                string;
    shortName:           string;
    tla:                 string;
    logo:               string;
    mongoId:             string;
    _id?:               mongoose.Schema.Types.ObjectId;
}

export interface SearchPlayer{
    id:string,
    Squad:Array<{}>
}