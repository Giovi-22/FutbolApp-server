import { User } from "../interfaces/users.interface";

class UserEntity{

    #email:string;
    #password:string;

    constructor(user:User){
        this.#email = user.email;
        this.#password = user.password;
    }
}

export default UserEntity;