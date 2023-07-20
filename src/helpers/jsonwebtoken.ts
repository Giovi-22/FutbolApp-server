import jwt from 'jsonwebtoken';
import UserEntity from '../domain/entities/User';
import { config } from '../config';

export const jwtGenerator = async(user:UserEntity)=>
{
    return jwt.sign({user:{...user,password:undefined}}, config.jwtKey,{expiresIn:'10m'});
}

export const jwtVerificator = async (token:string)=>
{   
    const result = jwt.verify(token,config.jwtKey,(err,credential)=>{
        if(err)
        {
            throw new Error("Authentication error, invalid o expired jwt");
        }
        return credential;
     });
     return result;
}