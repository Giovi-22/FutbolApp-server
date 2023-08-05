import axios from "axios";

import { axiosOptions } from "../../config";
import PlayerMongooseRepository from "../../data/repository/PlayerMongooseRepository";
import PlayerEntity from '../entities/Player';
import { Player } from "../interfaces/playerFootballData.interfaces";

class PlayerManager
{
        #PlayerRepository:PlayerMongooseRepository;
        #url:string;
    constructor()
    {
        this.#PlayerRepository = new PlayerMongooseRepository();
        this.#url= 'https://api.football-data.org/v4/persons';
    }

    async getApiPlayer(playerId:Number):Promise<PlayerEntity | null>{
        try {
            const result = await axios.get<Player>(`${this.#url}/${playerId}`,axiosOptions);
            if(result instanceof Error){
                return null
            }
            if(!result.data){
                throw new Error("No se pudieron obtener los datos");
            }
            const newPlayer = new PlayerEntity({
                id: result.data.id,          
                name: result.data.name,        
                firstName: result.data.firstName,   
                lastName: result.data.lastName,    
                dateOfBirth: result.data.dateOfBirth, 
                nationality: result.data.nationality, 
                section: result.data.section,     
                position: result.data.position,    
                shirtNumber: result.data.shirtNumber, 
                lastUpdated: result.data.lastUpdated,
            })
            return newPlayer;
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    addPlayer(newPlayer:PlayerEntity){
        return this.#PlayerRepository.create(newPlayer);
    }

    async getList(playersId:number[]):Promise<PlayerEntity[]>
    {
        let playerList:PlayerEntity[] = [];
        for await(const playerId of playersId){
            const result = await this.#PlayerRepository.findByPlayerId(playerId);
            console.log("El jugador es: ",result)
            if(!result){
                console.log("no se encuentra el jugador ")
            }
            if(result){
                playerList.push(result)
            }
        }
        console.log("La lista de jugadores es: ",playerList)
        return playerList;
        
    }
   
    async getById(pid:number)
    {
        //await idValidation.parseAsync(uid);
        const user = await this.#PlayerRepository.findById(pid);
        console.log("el jugador es: ",user)
        return user;
    }
    
}

export default PlayerManager;