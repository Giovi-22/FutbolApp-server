import dotenv from 'dotenv';
dotenv.config();

export const config={
    appPort: process.env.PORT,
    apiKey: process.env.FOOTBALL_API_KEY,


}

export const axiosOptions = {
    headers:{
        'Content-Type': 'application/json',
        'X-Auth-Token': config.apiKey,
    }
}