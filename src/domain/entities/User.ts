import mongoose from "mongoose";
import { User } from "../interfaces/users.interface";
import TeamEntity from "./Team";

class UserEntity{

    id?:string;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    favoriteTeams: TeamEntity[];
    //favoritePlayers?: mongoose.Schema.Types.ObjectId[];
    //role?: mongoose.Schema.Types.ObjectId;

    constructor(user:User){
        this.email = user.email;
        this.password = user.password;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.id = user.id;
        //this.favoritePlayers = user.favoritePlayers;
        this.favoriteTeams = user.favoriteTeams;
        //this.role = user.role;
    }
}

export default UserEntity;