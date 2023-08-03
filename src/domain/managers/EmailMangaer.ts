import nodemailer, { Transporter }  from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import fs from 'fs/promises'
import Handlebars from 'handlebars';
import path from 'path';

import { config } from '../../config';
import { EmailTemplate } from '../interfaces/emailTemplates.interfaces';



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

    async send(to:string,subject:string,data:EmailTemplate ,templateHbs:string):Promise<any | Error>{
        try {
            const template = await this.#selectTemplate(data,templateHbs);

            let mail = await this.#transporter.sendMail(
            {
                from:"giovannibarolin@gmail.com",
                to:to,
                subject:subject,
                html:template
            }
        )
        return mail;
            
        } catch (error) {
            return new Error(`error al enviar el email: ${error}`)
        }
        
    }

    async #selectTemplate(data:EmailTemplate,templateHbs:string){
        const templateDir = path.resolve('src/presentation/templates');
        const source = (await fs.readFile(`${templateDir}/${templateHbs}`)).toString();
        const template = Handlebars.compile(source);
        const html = template(data);
        return html;
    }
}

export default EmailManager;