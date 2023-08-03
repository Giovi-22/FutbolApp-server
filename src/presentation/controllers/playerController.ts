import { NextFunction, Request, Response } from "express";
import PlayerManager from "../../domain/managers/PlayerManager";

class PlayerController{


    static async getById(req:Request,res:Response, next:NextFunction){
        try {
            const playerM = new PlayerManager();
            const result = await playerM.getById(Number(req.params.pid))
            return res.status(200).send({status:'success',message:"The player",data:result})
        } catch (error) {
            const newError:string = `${error}`;
            return next(newError);
        }
        
    }

    static async getListOfPlayers(req:Request,res:Response, next:NextFunction){
        try {
            const playersList = req.body.players;
            const playerM = new PlayerManager();
            const result = await playerM.getList(playersList);
            if(result instanceof Error){
                return res.status(404).send({status:'failed',message:"Players not found"});
            }
            return res.status(200).send({status:'success',message:"The player list",data:result})
        } catch (error) {
            const newError:string = `${error}`;
            return next(newError);
        }
        
    }

}

export default PlayerController;