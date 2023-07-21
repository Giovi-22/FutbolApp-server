import UserEntity from "../../domain/entities/User"

export interface UserRepository{

    create(user:UserEntity):Promise<UserEntity>,
    deleteOne(uid:string):Promise<string>,
    update(uid:string,data:UserEntity):Promise<UserEntity>
}