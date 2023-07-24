
import { Request, Response } from "express";
import EmailManager from "../../domain/managers/EmailMangaer";


class EmailController{

    static async sendEmail(req:Request,res:Response){
        try {
            const emailM = new EmailManager();
            const email = await emailM.send("giovannibarolin@gmail.com","User created successfully",{user:{firstName:"Giovanni",lastName:"Barolin",email:"giovannibarolin@gmail.com",password:""}},"userCreated.hbs")
            res.status(200).send({status:"success", data:email});
        } catch (error) {
            console.log("Se ha producido un error: ",error);
        }
    }
 
}

export default EmailController;