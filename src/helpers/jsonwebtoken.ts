import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import UserEntity from '../domain/entities/User';
import { config } from '../config';
import { User } from '../domain/interfaces/users.interface';
import { UserToken } from '../domain/interfaces/interfaces';
//import { Credentials, User } from '../domain/interfaces/users.interface';
export const jwtGenerator = async(user:UserToken,expire:string='10m'):Promise<string | Error>=>
{
    return jwt.sign({user:{...user,password:""}}, config.jwtKey,{expiresIn:expire});
}

export async function jwtVerificator (token: string):Promise<Partial<User> | Error>{
    try {
      const decoded = jwt.verify(token, config.jwtKey) as JwtPayload;
      console.log("el token decodificado: ",decoded)
      return { 
        id: decoded.user.id, 
        firstName: decoded.user.firstName,
        lastName: decoded.user.lastName,
        email: decoded.user.email,
        password: decoded.user.password,
     };
    } catch (error) {
      console.error('Error al verificar el token');
      return new Error('Error al verificar el token');
    }
}
  