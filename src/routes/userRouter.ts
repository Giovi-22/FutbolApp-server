import { Router } from 'express';
import UserController from '../presentation/controllers/userController';

//import auth from '../middlewares/auth.js';

const userRouter = Router();


//userRouter.get('/list',auth,authorization('getList'),UserController.list);
//userRouter.get('/:uid',auth,authorization('getOne'),UserController.getOne);              
userRouter.post('/',UserController.create);            //ruta privada
//userRouter.put('/:uid',auth,authorization('updateOne'),UserController.updateOne);
//userRouter.delete('/:uid',auth,authorization('deleteOne'),UserController.deleteOne);

export default userRouter;