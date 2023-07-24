import UserEntity from "../entities/User";

export interface EmailTemplate{
    user?:UserEntity,
    jwt?:string
}