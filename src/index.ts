import { config } from './config';
import DbFactory from './data/factories/dbFactory';
import AppFactory from './presentation/factories/appFactory';



const app = AppFactory.create('express');
const db = DbFactory.create('mongo');
db.init(config.dbUri);

app.init();
app.build();
app.listen();

