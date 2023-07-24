import { Request, Response } from "express";
import PlayerManager from "../../domain/managers/PlayerManager";

class PlayerController{

    static async getPlayer(req:Request,res:Response){
        try {
            const intervalo = 7*1000; //cada 7 segundos
            let playerId = 3508;
            setInterval(async()=>{
            const playerM = new PlayerManager();
            const newPlayer = await playerM.create(playerId);
            console.log("el jugador es: ",newPlayer)
            console.log("el id: ",playerId)
            playerId++; 
        },intervalo)
            res.status(200).send({status:"success, iniciando busqueda..."});
        } catch (error) {
            console.log("Se ha producido un error: ",error);
        }
    }
    
    iniciarBusqueda(){
        const intervalo = 7*1000; //cada 7 segundos
        let playerId = 2;
        setInterval(async()=>{
            const playerM = new PlayerManager();
            const newPlayer = await playerM.create(playerId);
            playerId++; 
        },intervalo)
    }

}

export default PlayerController;