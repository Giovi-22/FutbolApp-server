import mongoose from "mongoose";
import { TeamDto } from "../interfaces/dto.interfaces";

class TeamEntity{    
    id;    
    name;    
    shortName;
    tla;    
    logo;
    mongoId:string;
    _id?:mongoose.Schema.Types.ObjectId

    constructor(team:TeamDto){
        this.id=        team.id;
        this.name=      team.name;
        this.shortName= team.shortName;
        this.tla=       team.tla;
        this.logo=      team.logo;
        this.mongoId=   team.mongoId;
        this._id = team._id;
    }

}
export default TeamEntity;