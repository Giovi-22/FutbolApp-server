import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import UserEntity from '../domain/entities/User';
import { config } from '../config';
import { User } from '../domain/interfaces/users.interface';
//import { Credentials, User } from '../domain/interfaces/users.interface';
export const jwtGenerator = async(user:UserEntity)=>
{
    return jwt.sign({user:{...user,password:""}}, config.jwtKey,{expiresIn:'10m'});
}

export async function jwtVerificator (token: string):Promise<User | null>{
    try {
      const decoded = jwt.verify(token, config.jwtKey) as JwtPayload;
      return { 
        id: decoded.id, 
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
        password: decoded.password
     };
    } catch (error) {
      console.error('Error al verificar el token');
      return null;
    }
}
  