import mongoose from "mongoose";
import { User } from "../../domain/interfaces/users.interface";
import TeamEntity from "../../domain/entities/Team";


const userCollection = 'users';

const userSchema = new mongoose.Schema<User>(
    {
    firstName: {type:String,require:true},
    lastName: {type:String,require:true},
    email: {type:String,require:true,unique:true},  
    password: {type:String,require:true},
    favoriteTeams:{
        type:[{ }]
    },
    favoritePlayers:{
        type:[{
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'players'
            }
        }]
    },
    role: {type:mongoose.Schema.Types.ObjectId,ref:'roles',default:null},
})

export const userModel = mongoose.model<User>(userCollection,userSchema);