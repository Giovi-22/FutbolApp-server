import express from 'express';
import cors from 'cors';

import competitionRoute from './src/routes/competitions.js';
import { config } from './src/config/index.js';


const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin: '*',
    credentials:true}));

app.use('/api',competitionRoute);

app.listen(config.appPort,()=>console.log(`servidor escuchando en el puerto ${config.appPort}` ))