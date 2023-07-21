import express from 'express';


import cors from 'cors';

import competitionRoute from './routes/competitions';
//import teamRouter from './routes/teamsRouter';
import sessionRouter from './routes/sessionRoute';
import { config } from './config';
import DbFactory from './data/factories/dbFactory';



const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors({
    origin: '*',
    credentials:true}));
const db = DbFactory.create('mongo');
db.init(config.dbUri);

app.use('/api/competitions',competitionRoute);
//app.use('/api/teams',teamRouter);
app.use('/api/session',sessionRouter);

app.listen(8081,()=>console.log(`servidor escuchando en el puerto ${8081}` ))