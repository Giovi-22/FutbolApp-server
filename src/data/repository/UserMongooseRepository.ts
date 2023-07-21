import UserEntity from "../../domain/entities/User.js";
import User from "../../domain/entities/User.js";
import { userModel } from "../models/userModel.js";
import { UserRepository } from "../models/userRepository.interfaces.js";


class UserMongooseRepository implements UserRepository{

    async create(user:UserEntity)
    {
        const newUser = await userModel.create(user);
        return new UserEntity({
            id:newUser._id.toString(),
            firstName: newUser.firstName || "",
            lastName: newUser.lastName || "",
            email: newUser.email || "",
            password: newUser.password || ""

        })
    }
/*
    async findByFilter(filter)
    {
        let query = {};
        query[filter.field]=filter.value;
        const userDocument = await userModel.findOne(query).populate('role');
        if(!userDocument)
        {
            throw new Error(`No se encuentra ${filter.field}: ${filter.value}`,{casuse:'Not Found'});
        }
        return new User({
            id:userDocument?._id,
            firstName: userDocument?.firstName,
            lastName: userDocument?.lastName,
            email: userDocument?.email,
            age:userDocument?.age,
            password:userDocument?.password,
            cart: userDocument?.cart,
            role: userDocument?.role
        })
    }

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
            throw new Error(`No se encuentra el usuario ${uid}`);
        }
        return new UserEntity(
            {
                id:userDocument._id.toString(),
                firstName: userDocument.firstName || "",
                lastName: userDocument.lastName || "",
                email: userDocument.email || "",
                password: userDocument.password || ""
    
            })
    }
}

export default UserMongooseRepository;