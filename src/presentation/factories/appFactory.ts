import ExpressApp from "../application/ExpressApp";
import { Application } from "../application/application.interfaces";


class AppFactory{

    static create(appType='express'):Application{
        try {
            const apps = new Map();
            apps.set(appType,ExpressApp);
            const app = apps.get(appType);
            return new app();

        } catch (error) {
            throw new Error("se ha producido un error");
        }
    }
}

export default AppFactory;