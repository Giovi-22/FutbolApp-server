import mongoose from "mongoose";
import UserEntity from "../entities/User";
import TeamEntity from "../entities/Team";

export interface User{
    id?:string;
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    favoriteTeams: TeamEntity[],
    favoritePlayers?: mongoose.Schema.Types.ObjectId[],
    role?: mongoose.Schema.Types.ObjectId,
}

export interface Credentials{
        user:UserEntity
}