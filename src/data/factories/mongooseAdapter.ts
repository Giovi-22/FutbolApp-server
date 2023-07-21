import mongoose from "mongoose";
import { DbAdapter } from "./dbAdapters.interfaces";

class MongooseAdapter implements DbAdapter{

    connection!:typeof mongoose;

    constructor(){
    }

    async init(uri:string){
        this.connection = await mongoose.connect(uri);
    }

    async close(){
        await this.connection.disconnect();
    }
}

export default MongooseAdapter;