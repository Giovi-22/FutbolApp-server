import { Router } from "express";

const sessionRouter = Router();


sessionRouter.post('/login',sesionController.login);

export default sessionRouter;