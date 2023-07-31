import container from "../../container";
import { UserRepository } from "../../data/models/userRepository.interfaces";
import { hashPassword } from "../../helpers/bcrypt";
import { userZodSchema } from "../../helpers/zodValidators";
import TeamEntity from "../entities/Team";
import UserEntity from "../entities/User";
import { ApiFilter } from "../interfaces/interfaces";
import { User } from "../interfaces/users.interface";
import TeamManager from "./TeamManager";


class UserManager
{
        #UserRepository:UserRepository;
        #teamM:TeamManager;
    constructor()
    {
        this.#UserRepository = container.resolve('userRepository');
        this.#teamM = new TeamManager();
    }

    async create(user:UserEntity)
    {
        await userZodSchema.parseAsync(user);
        const newUser = {...user,password: await hashPassword(user.password)};
        const result = await this.#UserRepository.create(newUser);
        return new UserEntity({
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            password:"",
            favoriteTeams:result.favoriteTeams
        })
    }
/*
    async getList(filters)
    {
        const result = await this.#UserRepository.Paginate(filters);
        return result;
    }
*/
    async findByFilter(filter:ApiFilter):Promise<UserEntity | Error>
    {
        if(!filter.field && !filter.value)
        {
            return Error('Todos los campos deben ser completados');
        }
        const result = await this.#UserRepository.findByFilter(filter);
        return result;
    }
    /*
    async getById(uid)
    {
        await idValidation.parseAsync(uid);
        const user = await this.#UserRepository.findById(uid);
        return user;
    }
*/
    async updateOne(uid:string,data:UserEntity)
    {
        //await idValidation.parseAsync(uid);
        const userUpdated = await this.#UserRepository.update(uid,data);
        return userUpdated;
    }
    /*
    async deleteOne(uid)
    {
        await idValidation.parseAsync(uid);
        const deletedUser = await this.#UserRepository.deleteOne(uid);
        return deletedUser;
    }
*/
async setFavoritePlayer(playerId: string): Promise<string> {
    return new Promise((resolve,reject)=>resolve(""));
}

async setFavoriteTeam(userEmail:string,team:TeamEntity): Promise<UserEntity | Error> {
    const user = await this.findByFilter({field:"email",value:userEmail});
    if(user instanceof Error){
        return new Error(user.message);
    }
    const result = await this.#teamM.findOne(team.id);
    //el equipo no existe, se crea y se le asigna al usuario
    if(!result){
        const newTeam = await this.#teamM.create(team);
        const favorites = [...user.favoriteTeams,newTeam];
        return this.#UserRepository.updateTeam({favoriteTeams:favorites},user.id || "")
    }
    //el equipo existe, se le asigna al usuario si no esta repetido
    const favTeams = user.favoriteTeams.find(team => team.id === result.id);
    if(!favTeams){ 
        const favorites = [...user.favoriteTeams,result];
        return this.#UserRepository.updateTeam({favoriteTeams:favorites},user.id || "")    
    }
    return this.#UserRepository.updateTeam({favoriteTeams:user.favoriteTeams},user.id || "")    
    }

    async getFavoriteTeasm(email:string):Promise<TeamEntity[] | Error>{
        const result = await this.#UserRepository.findByFilter({field:"email",value:email});
        if(result instanceof Error){
            return result;
        }
        const favoriteList = result.favoriteTeams.map(team => new TeamEntity(team));
        return favoriteList;
    }

    async removeFavoriteTeam(teamId:number,userEmail:string){
        const user = await this.findByFilter({field:"email",value:userEmail});
        if(user instanceof Error){
            return new Error(user.message);
        }
        const teamList = user.favoriteTeams.filter(team=> team.id !== teamId);
        return this.#UserRepository.updateTeam({favoriteTeams:teamList},user.id ||"");
    }

    

    

}


export default UserManager;