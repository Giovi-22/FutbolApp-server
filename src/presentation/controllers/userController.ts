import { NextFunction, Request, Response } from 'express';
import UserManager from '../../domain/managers/UserManager';
import UserEntity from '../../domain/entities/User';
import TeamManager from '../../domain/managers/TeamManager';

class UserController{

    static async create(req:Request,res:Response,next:NextFunction)
    {
        const newUser = new UserEntity({
            email:  req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            favoriteTeams:[]
        })
        console.log("El usuario es: ",newUser)
        try
        {
            const uManager = new UserManager();
            const result = await uManager.create(newUser);
            return res.status(201).json({status:"success",data:result});
        }
        catch (error)
        {
            next(error);
            return;
        }

    }
/*
    static async list(req,res,next)
    {
        const options = {
            ...req.query,
            query: JSON.parse(`{${req.query?.filter ?? ""}}`)
        }
        
        try
        {
            const uManager = new UserManager();
            const result = await uManager.getList(options);
            return res.status(200).json({status:"success",data:result.docs, ...result, docs:undefined });
        }
        catch (error)
        {
            next(error);
        }
    }
*/
    static async getOne(req:Request,res:Response,next:NextFunction)
    {

        try
        {
            const uManager = new UserManager();
            const user = await uManager.findByFilter({field:"email",value:req.body.email});
            if(user instanceof Error){
                return res.status(404).send({status:"failed",data:{},message:`No se ha encontrado el usuario, ${user.message}`});
            }
            return res.status(200).send({status:"success",data:user,message:"Usuario encontrado"});
        } 
        catch (error)
        {
            return next(error);
        }
    }

    static async updateOne(req:Request,res:Response,next:NextFunction)
    {
        const uid = req.params.uid;
        const data = req.body;
        try
        {         
            const uManager = new UserManager();
            const userUpdated = await uManager.updateOne(uid,data);
            return res.status(200).json({status:"success",data:userUpdated,message:"Usuario actualizado!"});
        }
        catch (error)
        {
            return next(error);
        }
    }
/*
    static async deleteOne(req,res,next)
    {
        const uid = req.params.uid;
        try
        {
            const uManager = new UserManager();
            const result = await uManager.deleteOne(uid);
            return res.status(200).json({status:"success",message:result.message});
        }
        catch (error)
        {
            next(error);
        }
    }
    */

    static async setFavoriteTeam(req:Request,res:Response,next:NextFunction){
        try {
            console.log("el body: ",req.body)
            const userM = new UserManager();
            const teamM = new TeamManager();
            //const newTeam = await teamM.create(req.body.team);
           const result = await userM.setFavoriteTeam(req.user.email|| "",req.body);
           console.log("Usuario resultante: ",result);
           return res.status(200).json({status:"success",data:result,message:"Usuario actualizado!"});
        } catch (error) {
            return console.log("El error es: ",error)
        }
    }

    static async getFavoriteTeams(req:Request,res:Response,next:NextFunction){
        try {
            const userM = new UserManager();
            const teamsList = await userM.getFavoriteTeasm(req.user.email || "");
            if(teamsList instanceof Error){
                return res.status(400).send({status:"failed",data:{},message:`The user don't have favorite teams`});
            }
            console.log("Lista de equipos favoritos: ",teamsList);
            return res.status(200).send({status:"success",data:teamsList,message:`The favorite team list`});
            
        } catch (error) {
          return console.log(error)  
        }
    }

    static async removeFavoriteTeam(req:Request,res:Response,next:NextFunction){
        try {
            const teamId = +req.params.tid;
            const userM = new UserManager();
            const result = userM.removeFavoriteTeam(teamId,req.user.email || "");
            if(result instanceof Error){
                return res.status(400).send({status:"failed",data:{},message:"The team could not be removed"});
            }
            return res.status(200).send({status:"success",data:result,message:`The favorite team list`});
        } catch (error) {
            return console.log(error);
        }
    }
}

export default UserController;