import { Router } from "express";
import TeamController from "../presentation/controllers/teamController.js";

const teamRouter = Router();


teamRouter.get('/team/:teamName',TeamController.getTeam);
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

export default teamRouter;