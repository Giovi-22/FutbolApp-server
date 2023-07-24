import mongoose from "mongoose";
import { Player } from "../interfaces/playerFootballData.interfaces";

class PlayerEntity{

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


        constructor(player:Player){
            this.id=          player.id;
            this.name=        player.name;
            this.firstName=   player.firstName;
            this.lastName=    player.lastName;
            this.dateOfBirth= player.dateOfBirth;
            this.nationality= player.nationality;
            this.section=     player.section;
            this.position=    player.position;
            this.shirtNumber= player.shirtNumber;
            this.lastUpdated= player.lastUpdated;


        }    
}

export default PlayerEntity;