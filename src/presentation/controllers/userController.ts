import { NextFunction, Request, Response } from 'express';
import UserManager from '../../domain/managers/UserManager';
import UserEntity from '../../domain/entities/User';
import TeamEntity from '../../domain/entities/Team';

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
        try
        {
            const uManager = new UserManager();
            const result = await uManager.create(newUser);
            return res.status(201).json({status:"success",data:result});
        }
        catch (error)
        {
            const newError:string = `${error}`;
            return next(newError);
        }

    }

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
            const newError:string = `${error}`;
            return next(newError);
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
            const newError:string = `${error}`;
            return next(newError);
        }
    }


    static async setFavoriteTeam(req:Request,res:Response,next:NextFunction){
        try {
            const {team} = req.body;
            const newTeam = new TeamEntity({
                id:team.id,
                logo:team.logo,
                mongoId:"",
                name:team.name,
                shortName:team.shortName,
                tla:team.tla,
            })
            const userM = new UserManager();
            const result = await userM.setFavoriteTeam(req.user.email|| "",newTeam);
            return res.status(200).json({status:"success",data:result,message:"Usuario actualizado!"});
        } catch (error) {
            const newError:string = `${error}`;
            return next(newError);
        }
    }

    static async getFavoriteTeams(req:Request,res:Response,next:NextFunction){
        try {
            const userM = new UserManager();
            const teamsList = await userM.getFavoriteTeasm(req.user.email || "");
            if(teamsList instanceof Error){
                return res.status(400).send({status:"failed",data:{},message:`The user don't have favorite teams`});
            }
            return res.status(200).send({status:"success",data:teamsList,message:`The favorite team list`});
        } catch (error) {
            const newError:string = `${error}`;
            return next(newError);
        }
    }

    static async removeFavoriteTeam(req:Request,res:Response,next:NextFunction){
        try {
            const teamId = +req.params.tid;
            const userM = new UserManager();
            const result = await userM.removeFavoriteTeam(teamId,req.user.email || "");
            if(result instanceof Error){
                return res.status(400).send({status:"failed",data:{},message:"The team could not be removed"});
            }
            return res.status(200).send({status:"success",data:result,message:`The favorite team list`});
        } catch (error) {
            const newError:string = `${error}`;
            return next(newError);
        }
    }
}

export default UserController;