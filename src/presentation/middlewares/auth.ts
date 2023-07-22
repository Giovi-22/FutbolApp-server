import { NextFunction, Request, Response } from "express";
import { jwtVerificator } from "../../helpers/jsonwebtoken";


const auth = async (req:Request,res:Response,next:NextFunction)=>{

    try {
    const authHeader = req.headers?.authorization;
    if(!authHeader){
        throw new Error('Error: authorization has not been sent');
    }
    const token = authHeader.split(' ')[1];

    const credential = await jwtVerificator(token);
    if(!credential){
        throw new Error("No se pudieron obtener las credenciales");
    }
    req.user = credential;
    next();
    
    } catch (error) {
        next(error)
    }
    
}

export default auth;