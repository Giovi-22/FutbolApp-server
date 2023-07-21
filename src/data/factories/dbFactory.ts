import { DbAdapter } from "./dbAdapters.interfaces";
import MongooseAdapter from "./mongooseAdapter";


class DbFactory{

    static create(dbType='mongo'):DbAdapter{
        const dbs = new Map();
        dbs.set('mongo', MongooseAdapter);

        const db = dbs.get(dbType);
        return new db;
    }
}

export default DbFactory;