import container from "../../container";
import { verifyPassword } from "../../helpers/bcrypt";
import { jwtGenerator } from "../../helpers/jsonwebtoken";
import { loginValidation, userZodSchema } from "../../helpers/zodValidators";
import UserEntity from "../entities/User";
import UserManager from "./UserManager";

class SessionManager{

    userM;

    constructor(){
        this.userM = new UserManager();
    }

    async logIn(user:UserEntity){
        await loginValidation.parseAsync(user);
        const userDB = await this.userM.findByFilter({field:'email',value:user.email});
        const isValid = await verifyPassword(userDB.password,user.password);
        if(!isValid)
        {
            throw new Error('Login failed, invalid password!');
        }
        const userAccessToken = await jwtGenerator({email:userDB.email,id:userDB.id})
        return userAccessToken;
    }

    async signUp(user:UserEntity)
    {
        await userZodSchema.parseAsync(user);
        const userM = new UserManager();
        const newUser = await userM.create(user);
        return newUser;
    }
}

export default SessionManager;