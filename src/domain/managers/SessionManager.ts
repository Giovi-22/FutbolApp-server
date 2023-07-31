import container from "../../container";
import { hashPassword, verifyPassword } from "../../helpers/bcrypt";
import { jwtGenerator, jwtVerificator } from "../../helpers/jsonwebtoken";
import { loginValidation, userZodSchema } from "../../helpers/zodValidators";
import UserEntity from "../entities/User";
import { Credentials } from "../interfaces/users.interface";
import EmailManager from "./EmailMangaer";
import UserManager from "./UserManager";

class SessionManager{

    userM;

    constructor(){
        this.userM = new UserManager();
    }

    async logIn(user:UserEntity){
        await loginValidation.parseAsync(user);
        const userDB = await this.userM.findByFilter({field:'email',value:user.email});
        if(userDB instanceof Error){
            throw new Error("no se encuentra el usuario");
        }
        const isValid = await verifyPassword(userDB.password,user.password);
        if(!isValid)
        {
            throw new Error('Login failed, invalid password!');
        }
        const userAccessToken = await jwtGenerator({email:userDB.email,id:userDB.id},"5min")
        return userAccessToken;
    }

    async signUp(user:UserEntity)
    {
        await userZodSchema.parseAsync(user);
        const newUser = await this.userM.create(user);
        return newUser;
    }

    async forgotPassword(email:string):Promise<UserEntity | Error>{
            const dbUser = await this.userM.findByFilter({field:"email",value:email});
            if(dbUser instanceof Error){
                return new Error("No se ha encontrado el usuario");
            }
            const emailM = new EmailManager();
            const jwtForgotPassword = await jwtGenerator(dbUser,"1min");
            if(jwtForgotPassword instanceof Error){
                return new Error(jwtForgotPassword.message);
            }
            const result = await emailM.send(dbUser.email,"Change password",{user:dbUser,jwt:jwtForgotPassword},"forgotPassword.hbs") 
            if(result instanceof Error){
                return new Error(result.message)
            }
            return result;
    }

    async changeForgotPassword(password:string,confirmedPassword:string, token:string):Promise<UserEntity | Error>{

            const credential = await jwtVerificator(token);
            if(credential instanceof Error){
                return new Error(credential.message);
            }
            if(password !== confirmedPassword){
                return new Error("Change password failed, the password and confirmedPassword do not match");
            }

            const user = await this.userM.findByFilter({field:"email",value:credential.email ||""});
            if(user instanceof Error){
                return new Error(user.message)
            }
            const newHashPassword = await hashPassword(password);
            const updatedUser = await this.userM.updateOne(user.id || "",{...user,password:newHashPassword,id:undefined})
            return updatedUser; 
    }
}

export default SessionManager;