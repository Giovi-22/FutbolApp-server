import express,{Express}  from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import path from 'path';

import '../../domain/interfaces/custom.interfaces'
import { config } from '../../config'
import { Application } from './application.interfaces';
import sessionRouter from '../../routes/sessionRoute';
import userRouter from '../../routes/userRouter';
import playerRouter from '../../routes/playerRoute';
import emailRouter from '../../routes/emailRouter';
import teamRouter from '../../routes/teamsRouter';
import { errorHandler } from '../middlewares/errorHandler';
import competitionRouter from '../../routes/competitions';
import { engine } from 'express-handlebars'





class ExpressApp implements Application{

        app:Express;
        viewPath:string = path.resolve('src/presentation/views');


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
        
        this.app.use(express.static(path.resolve('src/public')))
        this.app.engine('handlebars',engine({
            defaultLayout:`${this.viewPath}/layouts/main.handlebars`,
            layoutsDir:`${this.viewPath}`
        }))
        this.app.set('view engine','handlebars');
        this.app.set('views',this.viewPath);

        this.app.use(session({
            store: MongoStore.create({
                mongoUrl: config.dbUri,
                ttl:60,
            }),
            secret:'codigoSecreto',
            resave:false,
            saveUninitialized:false
        }));
        
        
        
        /*

        */
    }

    build(){
        
        this.app.use('/api/session',sessionRouter);
        this.app.use('/api/users',userRouter);
        this.app.use('/api/players',playerRouter);
        this.app.use('/api/email',emailRouter);
        this.app.use('/api/teams',teamRouter);
        this.app.use('/api/competitions',competitionRouter);
        this.app.use(errorHandler);
    }

    listen(){
        this.app.listen(config.appPort,()=>console.log(`Servidor escuchando en el puerto ${config.appPort}`));
    }


}

export default ExpressApp;
