import { Router } from "express";
import SessionController from "../presentation/controllers/sessionController";

const sessionRouter = Router();


sessionRouter.post('/login',SessionController.login);

export default sessionRouter;