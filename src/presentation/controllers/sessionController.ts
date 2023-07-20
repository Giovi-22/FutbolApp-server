import { Request, Response } from "express";
import SessionManager from "../../domain/managers/SessionManager";

class SessionController{


    static async login(req:Request,res:Response){
        try {
            const sessionM = new SessionManager();
        } catch (error) {
            
        }

    }


}

export default SessionController;