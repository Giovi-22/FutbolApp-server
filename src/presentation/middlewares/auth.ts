import { NextFunction, Request, Response } from "express";
import { jwtVerificator } from "../../helpers/jsonwebtoken";


const auth = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log("Dentro de auth")
    const authHeader = req.headers?.authorization;
    if(!authHeader){
        throw new Error('Error: authorization has not been sent');
    }
    const token = authHeader.split(' ')[1];
    const credential = await jwtVerificator(token);
    if(credential instanceof Error){
        throw new Error("Credentials don't found!");
    }

    req.user = credential;
    return next();
    } catch (error) {
       return res.status(401).send({status:'failed',message:`${error}`})
    }
    
}

export default auth;