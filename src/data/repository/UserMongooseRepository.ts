import TeamEntity from "../../domain/entities/Team";
import UserEntity from "../../domain/entities/User";
import { ApiFilter, ObjectIndex } from "../../domain/interfaces/interfaces";
import { userModel } from "../models/userModel";
import { UserRepository } from "../models/userRepository.interfaces";

class UserMongooseRepository implements UserRepository{

    async create(user:UserEntity)
    {
        const newUser = await userModel.create(user);
        return new UserEntity({
            id:newUser._id.toString(),
            firstName: newUser.firstName || "",
            lastName: newUser.lastName || "",
            email: newUser.email || "",
            password: newUser.password || "",
            favoriteTeams:newUser.favoriteTeams

        })
    }

    async findByFilter(filter:ApiFilter):Promise<UserEntity| Error>
    {
        const query:ObjectIndex ={}
        query[filter.field] = filter.value;

        const userDocument = await userModel.findOne(query);
        if(!userDocument)
        {
            return new Error("User not found");
        }

        return new UserEntity({
            id:(userDocument?._id).toString(),
            firstName: userDocument?.firstName,
            lastName: userDocument?.lastName,
            email: userDocument?.email,
            password:userDocument?.password,
            favoriteTeams:userDocument.favoriteTeams
        })
    }
/*
    async findById(uid)
    {
        const user = await userModel.findById(uid);
        if(!user)
        {
            throw new Error(`El usuario con id ${uid} no existe`,{cause:'Not Found'});
        }
        return new User({
            id:user?._id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            age:user?.age
        })
    }
*/
    async deleteOne(uid:string)
    {
        const result = await userModel.deleteOne({_id:uid});
        if(!result.deletedCount)
        {
            throw new Error("No se pudo eliminar el usuario");
        }
        return "Usuario eliminado!";

    }

    async update(uid:string,data:UserEntity)
    {
        const userDocument = await userModel.findOneAndUpdate({_id:uid},data,{new:true});
        if(!userDocument)
        {
            throw new Error(`User not found ${uid}`);
        }
        return new UserEntity(
            {
                id:userDocument._id.toString(),
                firstName: userDocument.firstName || "",
                lastName: userDocument.lastName || "",
                email: userDocument.email || "",
                password: userDocument.password || "",
                favoriteTeams:userDocument.favoriteTeams
            })
    }

    async updateTeam(data:Partial<UserEntity>,uid:string):Promise<UserEntity | Error>
    {
        const userDocument = await userModel.findOneAndUpdate({_id:uid},data,{new:true});
        if(!userDocument)
        {
            return new Error(`User not found ${uid}`);
        }
        return new UserEntity(
            {
                id:userDocument._id.toString(),
                firstName: userDocument.firstName || "",
                lastName: userDocument.lastName || "",
                email: userDocument.email || "",
                password: userDocument.password || "",
                favoriteTeams : userDocument.favoriteTeams,

            })
    }

}

export default UserMongooseRepository;