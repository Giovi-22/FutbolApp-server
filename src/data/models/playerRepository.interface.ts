import PlayerEntity from "../../domain/entities/Player"
import { ApiFilter } from "../../domain/interfaces/interfaces"

export interface PlayerRepository{

    create(user:PlayerEntity):Promise<PlayerEntity>,
    deleteOne(uid:string):Promise<string>,
    update(uid:string,data:PlayerEntity):Promise<PlayerEntity>
    findByFilter(filter:ApiFilter):Promise<PlayerEntity>
}