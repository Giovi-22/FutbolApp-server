import { Router } from "express";
import PlayerController from "../presentation/controllers/playerController";

const playerRouter = Router();


playerRouter.get('/player/:playerId',PlayerController.getPlayer);

//teamRouter.get('/team/:tid/teams',teamController.getTeams);
/*
teamRouter.get('/teams/:name',(req,res)=>{
    try {
        const teamName = req.params.name;
        teams.forEach((team)=>{
            
        })
    } catch (error) {
        
    }
})
*/

export default playerRouter;