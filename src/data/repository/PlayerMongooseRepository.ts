import UserEntity from "../../domain/entities/User";
import { ApiFilter, ObjectIndex } from "../../domain/interfaces/interfaces";
import { userModel } from "../models/userModel";
import { UserRepository } from "../models/userRepository.interfaces";
import { Filters } from '../../domain/interfaces/competitionsInterfaces';
import { PlayerRepository } from "../models/playerRepository.interface";
import PlayerEntity from "../../domain/entities/Player";
import { playerModel } from "../models/playerModel";


class PlayerMongooseRepository implements PlayerRepository{

    async create(player:PlayerEntity)
    {
        const newPlayer = await playerModel.create(player);
        return new PlayerEntity({
        id: newPlayer.id,          
        name: newPlayer.name,        
        firstName: newPlayer.firstName,   
        lastName: newPlayer.lastName,    
        dateOfBirth: newPlayer.dateOfBirth, 
        nationality: newPlayer.nationality, 
        section: newPlayer.section,     
        position: newPlayer.position,    
        shirtNumber: newPlayer.shirtNumber, 
        lastUpdated: newPlayer.lastUpdated, 
        })
    }

    async findByFilter(filter:ApiFilter)
    {
        const query:ObjectIndex ={}
        query[filter.field] = filter.value;
        console.log("el filtro es: ",query)
        
        const userDocument = await playerModel.findOne(query);
        if(!userDocument)
        {
            throw new Error(`No se encuentra ${filter.field}: ${filter.value}`);
        }
        return  new PlayerEntity({
            id: userDocument.id,          
            name: userDocument.name,        
            firstName: userDocument.firstName,   
            lastName: userDocument.lastName,    
            dateOfBirth: userDocument.dateOfBirth, 
            nationality: userDocument.nationality, 
            section: userDocument.section,     
            position: userDocument.position,    
            shirtNumber: userDocument.shirtNumber, 
            lastUpdated: userDocument.lastUpdated, 
            })
    }

    async findById(pid:number):Promise<PlayerEntity | Error>
    {
        const player = await playerModel.findOne<PlayerEntity>({id:pid});
        if(!player)
        {
            return new Error("No se encuentra el jugador");
        }
        return new PlayerEntity({
            id: player.id,          
            name: player.name,        
            firstName: player.firstName,   
            lastName: player.lastName,    
            dateOfBirth: player.dateOfBirth, 
            nationality: player.nationality, 
            section: player.section,     
            position: player.position,    
            shirtNumber: player.shirtNumber, 
            lastUpdated: player.lastUpdated,
        })
    }

    async deleteOne(uid:string)
    {
        const result = await userModel.deleteOne({_id:uid});
        if(!result.deletedCount)
        {
            throw new Error("No se pudo eliminar el usuario");
        }
        return "Usuario eliminado!";

    }

    async update(uid:string,data:PlayerEntity)
    {
        const userDocument = await playerModel.findOneAndUpdate({_id:uid},data,{new:true});
        if(!userDocument)
        {
            throw new Error(`No se encuentra el usuario ${uid}`);
        }
        return  new PlayerEntity({
            id: userDocument.id,          
            name: userDocument.name,        
            firstName: userDocument.firstName,   
            lastName: userDocument.lastName,    
            dateOfBirth: userDocument.dateOfBirth, 
            nationality: userDocument.nationality, 
            section: userDocument.section,     
            position: userDocument.position,    
            shirtNumber: userDocument.shirtNumber, 
            lastUpdated: userDocument.lastUpdated, 
            })
    }
}

export default PlayerMongooseRepository;