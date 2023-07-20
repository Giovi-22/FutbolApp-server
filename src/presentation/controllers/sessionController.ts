import { Request, Response } from "express";

class SessionController{


    static async login(req:Request,res:Response){
        try {
            console.log(req.body)
        } catch (error) {
            
        }

    }


}

export default SessionController;