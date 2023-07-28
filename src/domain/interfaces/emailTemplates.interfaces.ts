import UserEntity from "../entities/User";

export interface EmailTemplate{
    user?:Partial<UserEntity>,
    jwt?:string
}