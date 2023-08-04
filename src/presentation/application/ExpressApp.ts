import express,{Express}  from 'express';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';


import '../../domain/interfaces/custom.interfaces'
import { config } from '../../config'
import { Application } from './application.interfaces';
import sessionRouter from '../../routes/sessionRoute';
import userRouter from '../../routes/userRouter';
import playerRouter from '../../routes/playerRoute';
import emailRouter from '../../routes/emailRouter';
import teamRouter from '../../routes/teamsRouter';
import { errorHandler } from '../middlewares/errorHandler';
import competitionRoute from '../../routes/competitions';
import competitionRouter from '../../routes/competitions';





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
           origin:"*",
        }));
        
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
        this.app.use('/api/session',sessionRouter);
        this.app.use('/api/users',userRouter);
        this.app.use('/api/players',playerRouter);
        this.app.use('/api/email',emailRouter);
        this.app.use('/api/teams',teamRouter);
        this.app.use('/api/competitions',competitionRouter)
        this.app.use(errorHandler);
    }

    listen(){
        this.app.listen(config.appPort,()=>console.log(`Servidor escuchando en el puerto ${config.appPort}`));
    }


}

export default ExpressApp;
