import { loginValidation } from "../../helpers/zodValidators";
import UserEntity from "../entities/User";
import { User } from "../interfaces/users.interface";

class SessionManager{

    async logIn(user:User){
            await loginValidation.parseAsync(user);
            /*
        const userM = new UserManager();
        const userDB = await userM.findByFilter({field:'email',value:user.email});
        const isValid = await verifyPassword(userDB.password,user.password);
        if(!isValid)
        {
            throw new Error('Login failed, invalid password!',{cause:'Bad Request'});
        }
        const userAccessToken = await jwtGenerator({...userDB,password:undefined})
        return userAccessToken;
        */
    }
}

export default SessionManager;