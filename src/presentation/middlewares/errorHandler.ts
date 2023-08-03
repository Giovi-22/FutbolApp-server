import { Errback, NextFunction, Request, Response } from "express";


export const errorHandler = (err:string,req:Request,res:Response,next:NextFunction)=>{

    return res.status(500).send({status:'error',message:err});
   
}