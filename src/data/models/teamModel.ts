import mongoose from "mongoose";

import TeamEntity from "../../domain/entities/Team";


const teamCollection = 'teams';

const teamSchema = new mongoose.Schema<TeamEntity>(
    {
        id: {type:Number,require:true},          
        name: {type:String,require:true},        
        shortName:{type:String,require:true},   
        tla: {type:String,require:true},    
        logo: {type:String,require:true}, 
})

export const teamModel = mongoose.model<TeamEntity>(teamCollection,teamSchema);