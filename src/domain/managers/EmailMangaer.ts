import nodemailer, { Transporter }  from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import fs from 'fs/promises'
import Handlebars from 'handlebars';
import path from 'path';

import { config } from '../../config';
import UserEntity from '../entities/User';



class EmailManager{

    #smtpConfig!:SMTPTransport.Options;
    #transporter!:Transporter;
    constructor(){
        this.#init();
    }
    #init(){
        this.#smtpConfig={
            service:'gmail',
            port:587,
            auth:{
                user:'giovannibarolin@gmail.com',
                pass: config.emailKey
            }
        }
        this.#transporter = nodemailer.createTransport(this.#smtpConfig);
    }

    async send(to:string,subject:string,user:UserEntity){
        
        const templateDir = path.resolve('src/presentation/templates');
        const source = (await fs.readFile(`${templateDir}/userCreated.hbs`)).toString();
        const template = Handlebars.compile(source);
        const html = template({...user})


        let mail = await this.#transporter.sendMail(
            {
                from:"giovannibarolin@gmail.com",
                to:to,
                subject:subject,
                //html: templateHtml
                html
            }
        )
        return mail;
    }
}

export default EmailManager;