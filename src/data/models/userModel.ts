import mongoose from "mongoose";
import { User } from "../../domain/interfaces/users.interface";


const userCollection = 'users';

const userSchema = new mongoose.Schema<User>(
    {
    firstName: {type:String,require:true},
    lastName: {type:String,require:true},
    email: {type:String,require:true,unique:true},  
    password: {type:String,require:true},
})

export const userModel = mongoose.model<User>(userCollection,userSchema);