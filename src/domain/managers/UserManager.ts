import container from "../../container";
import { UserRepository } from "../../data/models/userRepository.interfaces";
import { hashPassword } from "../../helpers/bcrypt";
import { userZodSchema } from "../../helpers/zodValidators";
import UserEntity from "../entities/User";


class UserManager
{
        #UserRepository:UserRepository;

    constructor()
    {
        this.#UserRepository = container.resolve('userRepository');
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
            password:""
        })
    }
/*
    async getList(filters)
    {
        const result = await this.#UserRepository.Paginate(filters);
        return result;
    }

    async findByFilter(filter)
    {
        if(!filter.field && !filter.value)
        {
            throw new Error('Todos los campos deben ser completados',{cause:'Bad Request'});
        }
        const result = await this.#UserRepository.findByFilter(filter);
        return result;
    }
    async getById(uid)
    {
        await idValidation.parseAsync(uid);
        const user = await this.#UserRepository.findById(uid);
        return user;
    }

    async updateOne(uid,data)
    {
        await idValidation.parseAsync(uid);
        if(data?.password)
        {
            throw new Error('no tiene permisos para actualizar el password',{cause:'Forbidden'})
        }
        const userUpdated = await this.#UserRepository.update(uid,data);
        return userUpdated;
    }
    
    async deleteOne(uid)
    {
        await idValidation.parseAsync(uid);
        const deletedUser = await this.#UserRepository.deleteOne(uid);
        return deletedUser;
    }
*/
}

export default UserManager;