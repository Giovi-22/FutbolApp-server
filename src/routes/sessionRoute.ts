import { Router } from "express";
import SessionController from "../presentation/controllers/sessionController";
import auth from "../presentation/middlewares/auth";

const sessionRouter = Router();


sessionRouter.post('/login',SessionController.login);
sessionRouter.post('/signup',SessionController.signup);
sessionRouter.get('/current',auth,SessionController.current);
sessionRouter.post('/forgotpassword',auth,SessionController.forgotPassword)
sessionRouter.post('/logout',SessionController.logout);
export default sessionRouter;