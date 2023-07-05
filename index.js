import express from 'express';
import cors from 'cors';

import competitionRoute from './src/routes/competitions.js';
import { config } from './src/config/index.js';
import teamRouter from './src/routes/teamsRouter.js';
import sessionRouter from './src/routes/sessionRoute.js';


const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin: '*',
    credentials:true}));

app.use('/api/competitions',competitionRoute);
app.use('/api/teams',teamRouter);
app.use('/api/session',sessionRouter);
app.listen(config.appPort,()=>console.log(`servidor escuchando en el puerto ${config.appPort}` ))