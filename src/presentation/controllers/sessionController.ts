import { NextFunction, Request, Response } from "express";
import SessionManager from "../../domain/managers/SessionManager";
import UserEntity from "../../domain/entities/User";
import { jwtGenerator } from "../../helpers/jsonwebtoken";
import EmailManager from "../../domain/managers/EmailMangaer";
import UserManager from '../../domain/managers/UserManager';
import session from 'express-session';

class SessionController{


    static async login(req:Request,res:Response){
        try {
            const user= new UserEntity({
                email: req.body.email,
                password: req.body.password,
                firstName:"",
                lastName:""
            })
            console.log("Realizando login de: ",user)
            const sessionM = new SessionManager();
            const accessToken = await sessionM.logIn(user);
            const refreshToken = await jwtGenerator({email:user.email,id:user.id},"15m");
            res.cookie('user',refreshToken,{maxAge:(60*1000)*15,httpOnly:true}).send({status: true,message:'Login success',data:accessToken});
        } catch (error) {
            res.status(404).send({status: false,message:`${error}`,data:""})
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
                lastName: req.body.lastName
            })
            const sessionM = new SessionManager();
            const newUser = await sessionM.signUp(user);
            await emailM.send(newUser.email,"User created successfully",{user:newUser},"userCreated.hbs");
            res.status(201).send({status:true,data:newUser,message:"User created!"});
        }
        catch (error)
        {
            next(error);
        }
    }

    static async logout(req:Request,res:Response,next:NextFunction)
    {
        try
        {
            req.session.destroy((err)=>
            {
                if(!err)
                {
                    return res.status(200).send({status:'success',message:'Logout!'});
                }
                throw new Error(`logout failed!, Error: ${err}`);
            });
        }
        catch (error)
        {
            next(error);
        }
    }

    static async current(req:Request,res:Response,next:NextFunction){
        try {
            console.log("dentro de current",req.user)
            res.status(200).send({status:'success',data:req.user})
        } catch (error) {
            return next(error);
        }
    }

    static async forgotPassword(req:Request,res:Response,next:NextFunction){
        try {
            const userM = new UserManager();
            const user = await userM.findByFilter({field:"email",value:req.body.email});

            if(user instanceof Error){
                return res.status(404).send({status:"failed",message:user.message})
            }else{
                const emailM = new EmailManager();
                const jwtForgotPassword = await jwtGenerator(req.user,"2min");
                emailM.send(user.email,"Change password",{user:user,jwt:jwtForgotPassword},"forgotPassword.hbs") 
            }
            return res.status(200).send({status:"success",message:"Se ha enviado un email para restablecer la contraseña"})
        } catch (error) {
           return next(error);
        }
    }

}

export default SessionController;