const nodemailer = require('nodemailer');
const pool = require('../bd.js');
// const hbs = require('nodemailer-express-handlebars');

//Mandar mail generico
async function sendGenericEmail(mail) {
    
    try {

        //Defino el transporter, con el servicio a usar y las credenciales
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER, 
                pass: process.env.MAIL_PASSWORD
            },
            tls : {
                rejectUnauthorized : false
            }
        });

        // transporter.use('compile', hbs({
        //     viewEngine: 'express-handlebars',
        //     viewPath: './views/'
        // }));

        // Defino la info del mail
        let info = await transporter.sendMail({
            from: 'Rotten Apples <' + process.env.MAIL_USER + '>',
            to: mail.to, 
            subject: mail.subject, 
            html: mail.html 
        });

        return info.messageId;
    } 
    catch (error) {
        throw error; 
    }
}

module.exports = {sendGenericEmail} 