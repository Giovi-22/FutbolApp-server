import { User } from "../interfaces/users.interface";

class UserEntity{

    id?:string;
    firstName:string;
    lastName:string;
    email:string;
    password:string;

    constructor(user:User){
        this.email = user.email;
        this.password = user.password;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.id = user.id;
    }
}

export default UserEntity;