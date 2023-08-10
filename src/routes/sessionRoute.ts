import { Router } from "express";
import SessionController from "../presentation/controllers/sessionController";
import auth from "../presentation/middlewares/auth";

const sessionRouter = Router();


sessionRouter.post('/login',SessionController.login);
sessionRouter.post('/signup',SessionController.signup);
sessionRouter.get('/current',auth,SessionController.current);
sessionRouter.post('/forgotpassword',SessionController.forgotPassword);
sessionRouter.get('/changepassword/:token',SessionController.changePassword);
sessionRouter.put('/restorepassword',SessionController.restorePassword)
sessionRouter.post('/logout',SessionController.logout);
export default sessionRouter;