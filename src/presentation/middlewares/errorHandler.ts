import { AxiosError } from "axios";
import { Errback, NextFunction, Request, Response } from "express";


export const errorHandler = (err:AxiosError | any,req:Request,res:Response,next:NextFunction)=>{

    if(err instanceof AxiosError){
        return res.status(err.response?.status || 404).send({status:'error',message:err.cause})
    }
    return res.status(500).send({status:'error',message:err});
   
}