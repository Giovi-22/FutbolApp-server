import { Router } from 'express';
import UserController from '../presentation/controllers/userController';

//import auth from '../middlewares/auth.js';
import auth from '../presentation/middlewares/auth';

const userRouter = Router();



userRouter.get('/',UserController.getOne);              
userRouter.post('/',UserController.create);            
userRouter.put('/:uid',auth,UserController.updateOne);
userRouter.put('/team/set-team',auth,UserController.setFavoriteTeam);
userRouter.get('/team/get-list',auth,UserController.getFavoriteTeams);
userRouter.get('/team/remove-team/:tid',auth,UserController.removeFavoriteTeam);


export default userRouter;