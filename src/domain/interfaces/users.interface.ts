import UserEntity from "../entities/User";

export interface User{
    id?:string;
    firstName:string,
    lastName:string,
    email:string,
    password:string,
}

export interface Credentials{
        user:UserEntity
}