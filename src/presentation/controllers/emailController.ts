
import { NextFunction, Request, Response } from "express";
import EmailManager from "../../domain/managers/EmailMangaer";


class EmailController{

    static async sendEmail(req:Request,res:Response,next:NextFunction){
        try {
            const emailM = new EmailManager();
            const email = await emailM.send("giovannibarolin@gmail.com","User created successfully",{user:{firstName:"Giovanni",lastName:"Barolin",email:"giovannibarolin@gmail.com",password:""}},"userCreated.hbs")
            return res.status(200).send({status:"success", data:email});
        } catch (error) {
            const newError:string = `${error}`;
            return next(newError);
        }
    }
 
}

export default EmailController;