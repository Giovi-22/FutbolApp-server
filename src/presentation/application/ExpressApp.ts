import express,{Express}  from 'express';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';

import { config } from '../../config'
import sessionRouter from '../../routes/sessionRoute';
import { Application } from './application.interfaces';





class ExpressApp implements Application{
        app:Express;
    constructor(){
       this.app = express();
    }
    

    init(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(cookieParser());
        this.app.use(cors({
            origin: true,
            credentials:true}));
        
        this.app.use(session({
            store: MongoStore.create({
                mongoUrl: config.dbUri,
                ttl:60,
            }),
            secret:'codigoSecreto',
            resave:false,
            saveUninitialized:false
        }));
    }

    build(){
        this.app.use('/api/sessions',sessionRouter);
        //this.app.use('/api/users',userRouter)
        //this.app.use(errorHandler);
    }

    listen(){
        this.app.listen(config.appPort,()=>console.log(`Servidor escuchando en el puerto ${config.appPort}`));
    }

}

export default ExpressApp;
