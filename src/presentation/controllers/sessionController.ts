import { NextFunction, Request, Response } from "express";
import SessionManager from "../../domain/managers/SessionManager";
import UserEntity from "../../domain/entities/User";
import { jwtGenerator } from "../../helpers/jsonwebtoken";
import EmailManager from "../../domain/managers/EmailMangaer";
import UserManager from "../../domain/managers/UserManager";

class SessionController{


    static async login(req:Request,res:Response){
        try {
            const user= new UserEntity({
                email: req.body.email,
                password: req.body.password,
                firstName:"",
                lastName:"",
                favoriteTeams:[]
            })
            const sessionM = new SessionManager();
            const accessToken = await sessionM.logIn(user);
            const userM = new UserManager();
            const userLogged = userM.findByFilter({field:user.email,value:user.email});
            if(userLogged instanceof Error){
                res.status(401).send({status:'failed',message:"login failed"});
            }
            res.status(200).send({status:'success',message:'Login success',data:{token: accessToken, user:userLogged}});
        } catch (error) {
            res.status(401).send({status:'failed',message:`${error}`})
            return console.log("Error al loguearse ",error);
        }
    }

    static async signup(req:Request,res:Response,next:NextFunction)
    {
        try
        {
            const emailM = new EmailManager();
            const user= new UserEntity({
                email: req.body.email,
                password: req.body.password,
                firstName:req.body.firstName,
                lastName: req.body.lastName,
                favoriteTeams:[]
            })
            const sessionM = new SessionManager();
            const newUser = await sessionM.signUp(user);
            await emailM.send(newUser.email,"User created successfully",{user:newUser},"userCreated.hbs");
            return res.status(201).send({status:'success',data:newUser,message:"User created!"});
        }
        catch (error)
        {
            return next(error);
        }
    }

    static async logout(req:Request,res:Response,next:NextFunction)
    {
        try
        {
            console.log("dentro de logout")
            req.session.destroy((err)=>
            {
                if(!err)
                {
                    return res.status(200).send({status:'success',message:'Logout successfull!'});
                }
                throw new Error(`logout failed!, Error: ${err}`);
            });
            console.log("El usuario ha finalizado la session");
        }

        catch (error)
        {
            next(error);
        }
    }

    static async current(req:Request,res:Response,next:NextFunction){
        try {
            const userM = new UserManager();
            const user = await userM.findByFilter({field:"email",value:req.user.email || ""});
            if(user instanceof Error){
                res.status(401).send({status:'failed',message:user.message});
            }
            res.status(200).send({status:'success',message:"user submitted",data:user});
        } catch (error) {
            return next(error);
        }
    }

    static async forgotPassword(req:Request,res:Response,next:NextFunction){
        try {
            const sessionM = new SessionManager();
            const user = await sessionM.forgotPassword(req.body.email);

            if(user instanceof Error){
                return res.status(401).send({status:"failed",message:user.message})
            }
            return res.status(200).send({status:"success",message:"An email has beent sent to reset the password"})
        } catch (error) {
            return res.status(401).send({status:"failed",message:"failed"})
           //return next(error);
        }
    }

    static async changeForgotPassword(req:Request,res:Response,next:NextFunction){
        try {
            const {password, confirm, token} = req.body;
            const sessionM  = new SessionManager();
            const updatedUser = await sessionM.changeForgotPassword(password,confirm,token);
            if(updatedUser instanceof Error){
                return res.status(401).send({status:"failed",message:updatedUser.message})
            }
            return res.status(200).send({status:"success",data:updatedUser,message:"Password updated successfully"})
        } catch (error) {
           return next(error);
        }
    }

}

export default SessionController;