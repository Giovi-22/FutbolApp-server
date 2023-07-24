import { Router } from "express";
import EmailController from "../presentation/controllers/emailController";

const emailRouter = Router();


emailRouter.post('/send',EmailController.sendEmail);

export default emailRouter;