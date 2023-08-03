
import { User } from "../interfaces/users.interface";
import TeamEntity from "./Team";

class UserEntity{

    id?:string;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    favoriteTeams: TeamEntity[];

    constructor(user:User){
        this.email = user.email;
        this.password = user.password;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.id = user.id;
        this.favoriteTeams = user.favoriteTeams;

    }
}

export default UserEntity;