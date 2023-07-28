import { axiosOptions } from "../../config";
import container from "../../container";
import { UserRepository } from "../../data/models/userRepository.interfaces";
import PlayerMongooseRepository from "../../data/repository/PlayerMongooseRepository";
import { hashPassword } from "../../helpers/bcrypt";
import { userZodSchema } from "../../helpers/zodValidators";
import PlayerEntity from '../entities/Player';
import UserEntity from "../entities/User";
import { ApiFilter } from "../interfaces/interfaces";
import axios from "axios";
import { Player } from "../interfaces/playerFootballData.interfaces";
import TeamEntity from "../entities/Team";
import { Team } from "../interfaces/teamInterfaces";
import { Competitions } from "../interfaces/competitionsInterfaces";
import { SearchPlayer } from "../interfaces/dto.interfaces";

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
/*
    async create(competitionCode:string)
    {
        const teams = await this.getTeams(competitionCode);
        const playersId = [];
        if(teams instanceof Error){
            return new Error(teams.message);
        }
        for await (const team of teams) {
            for await (const player of team.Team.squad || []) {
                const result = await this.#PlayerRepository.findById(player.id)
                if(result instanceof Error){
                   playersId.push(player.id)
                }
            }
        }
        return playersId;
    }
/*
    async getTeams(competitionId:string):Promise<SearchPlayer[] | Error>{
        try {
            this.#url= 'https://api.football-data.org/v4/competitions';
            const result = await axios.get<Competitions>(`${this.#url}/${competitionId}/teams`,axiosOptions);
            if(!result.data){
                return new Error("No se pudieron obtener los datos");
            }
            if(!result.data.teams)
            {
                return new Error("La competicion no tiene equipos");
            }
            const newTeams = result.data.teams?.map(team=>{
                if(!team.squad?.length){
                    return {}
                }else{
                   return{ 
                    id:team.id,
                    squad:team.squad}
                }
                })
            return newTeams;
        } catch (error) {
            return new Error(`Error: ${error}`);
        }
    }
    */
/*
    async getList(filters)
    {
        const result = await this.#PlayerRepository.Paginate(filters);
        return result;
    }
*/
/*
    async findByFilter(filter:ApiFilter)
    {
        if(!filter.field && !filter.value)
        {
            throw new Error('Todos los campos deben ser completados');
        }
        const result = await this.#PlayerRepository.findByFilter(filter);
        return result;
    }
    */
   
    async getById(pid:number)
    {
        //await idValidation.parseAsync(uid);
        const user = await this.#PlayerRepository.findById(pid);
        console.log("el jugador es: ",user)
        return user;
    }
    
/*
    async updateOne(uid,data)
    {
        await idValidation.parseAsync(uid);
        if(data?.password)
        {
            throw new Error('no tiene permisos para actualizar el password',{cause:'Forbidden'})
        }
        const userUpdated = await this.#PlayerRepository.update(uid,data);
        return userUpdated;
    }
    
    async deleteOne(uid)
    {
        await idValidation.parseAsync(uid);
        const deletedUser = await this.#PlayerRepository.deleteOne(uid);
        return deletedUser;
    }
*/

}

export default PlayerManager;