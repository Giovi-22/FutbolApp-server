import dotenv from 'dotenv';
dotenv.config();
interface Config{
    appPort: string,
    apiKey: string,
    jwtKey: string,
    dbUri:string,
    emailKey:string
}
export const config:Config={
    appPort: process.env.PORT ||"",
    apiKey: process.env.FOOTBALL_API_KEY || "",
    jwtKey: process.env.JWT_KEY || "",
    dbUri: process.env.DB_URI || "",
    emailKey: process.env.EMAIL_KEY || "",

}

export const axiosOptions = {
    headers:{
        'Content-Type': 'application/json',
        'X-Auth-Token': config.apiKey,
    }
}