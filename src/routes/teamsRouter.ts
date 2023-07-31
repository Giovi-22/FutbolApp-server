import { Router } from "express";
import TeamController from "../presentation/controllers/teamController";

const teamRouter = Router();


teamRouter.get('/team/:limit',TeamController.getTeams);
teamRouter.get('/team/name/:teamName',TeamController.getTeamByName);
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