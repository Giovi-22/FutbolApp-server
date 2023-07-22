import { NextFunction, Request, Response } from "express";
import SessionManager from "../../domain/managers/SessionManager";
import UserEntity from "../../domain/entities/User";

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
            return res.cookie('user',accessToken,{maxAge:(60*1000)*10}).send({message:'Login success',data:accessToken});
        } catch (error) {
            return console.log("Error al loguearse ",error);
        }
    }

    static async signup(req:Request,res:Response,next:NextFunction)
    {
        try
        {
            const user= new UserEntity({
                email: req.body.email,
                password: req.body.password,
                firstName:req.body.firstName,
                lastName: req.body.lastName
            })
            const sessionM = new SessionManager();
            const newUser = await sessionM.signUp(user);
            res.status(201).send({status:'success',data:newUser});
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


}

export default SessionController;