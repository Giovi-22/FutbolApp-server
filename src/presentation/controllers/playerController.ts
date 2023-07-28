import { Request, Response } from "express";
import PlayerManager from "../../domain/managers/PlayerManager";

class PlayerController{

    static async getPlayer(req:Request,res:Response){
        try {
            const playerM = new PlayerManager();
            console.log("El parametro code es: ",req.params.code);
            //const newPlayers = await playerM.create(req.params.code);
            const newPlayers = new Error("esta ruta no esta habilitada")
            if(newPlayers instanceof Error){
                return console.log("se produjo un error: ",newPlayers.message);
            }
            const intervalo = 7*1000; //cada 7 segundos
            let count = 0;
            console.log("los jugadores a buscar son: ",newPlayers);
           // console.log("el ultimo es: ",newPlayers.length,newPlayers[newPlayers.length])
            setInterval(async()=>{
            const playerM = new PlayerManager();
            console.log("el id a buscar es: ",newPlayers[count]);
            if(!newPlayers[count]){
                return;
            }
            const newPlayer = await playerM.getApiPlayer(newPlayers[count]);
            if(!newPlayer){
                return console.log("no se encuentra el jugador en la api");
            }
            const result = await playerM.addPlayer(newPlayer);
            console.log("el jugador es: ",result)
            console.log("el id: ",result.id)
            count++; 
        },intervalo)
        
            res.status(200).send({status:"success, iniciando busqueda...",data:newPlayers});
        } catch (error) {
            console.log("Se ha producido un error: ",error);
        }
    }
    /*
    iniciarBusqueda(){
        const intervalo = 7*1000; //cada 7 segundos
        let playerId = 2;
        setInterval(async()=>{
            const playerM = new PlayerManager();
            const newPlayer = await playerM.create(playerId);
            playerId++; 
        },intervalo)
    }
    */

    static async getById(req:Request,res:Response){
        try {
            const playerM = new PlayerManager();
            const result = await playerM.getById(Number(req.params.pid))
            res.send(result)
        } catch (error) {
            
        }
        
    }

}

export default PlayerController;