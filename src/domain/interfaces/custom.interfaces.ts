import { Request } from "express"
import UserEntity from "../entities/User"

declare global{
    namespace Express{
        interface Request{
            user: Partial<UserEntity>
        }
    }
}