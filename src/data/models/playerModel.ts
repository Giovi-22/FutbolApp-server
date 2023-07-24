import mongoose from "mongoose";
import { User } from "../../domain/interfaces/users.interface";
import PlayerEntity from "../../domain/entities/Player";


const playerCollection = 'players';

const playerSchema = new mongoose.Schema<PlayerEntity>(
    {
        id: {type:Number,require:true},          
        name: {type:String,require:true},        
        firstName:{type:String,require:true},   
        lastName: {type:String,require:true},    
        dateOfBirth: {type:String,require:true}, 
        nationality: {type:String,require:true}, 
        section: {type:String,require:true},     
        position: {type:String,require:true},    
        shirtNumber: {type:Number,require:true}, 
        lastUpdated: {type:String,require:true}, 

})

export const playerModel = mongoose.model<PlayerEntity>(playerCollection,playerSchema);