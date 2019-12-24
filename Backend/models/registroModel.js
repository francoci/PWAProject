const pool = require('../bd');
const correosModel = require('./correosModel');

//Para registrar al usuario
async function registrar(obj){
    
    try {

        let result = 0;

        let query1 = "SELECT * FROM ?? WHERE mail_usuario = ?";
        const rows1 = await pool.query(query1,[process.env.TABLA_USUARIOS,obj.mail_usuario]);

        if(rows1.length == 0) {
            let query2 = "INSERT INTO ?? SET ?";
            const rows2 = await pool.query(query2,[process.env.TABLA_USUARIOS,obj]);

            if(rows2.insertId != undefined) {
                
                let mail = {
                    to : obj.mail_usuario,
                    subject : "Registro exitoso",
                    html : "Hola, gracias por registrarte. Activa tu cuenta siguiendo el siguiente enlace "+process.env.URLFRONT+"activar/"+ obj.codigo_mail_usuario
                }

                //<a href = 'localhost:4200/activar/" + obj.codigo_confirmacion + "'>Activar</a>
                let correo_ok = await correosModel.sendGenericEmail(mail);
                
                if(correo_ok) {
                    return result;
                } 
                else {
                    result = 2;
                    return result; 
                }
            } 
        }
        else {
            result = 1;
            return result;
        }
        
    } 
    catch (error) {
        throw error; 
    }
}

//Para activar la cuenta
async function activar(codigo){
    
    try {

        let query = "UPDATE ?? SET cuenta_confirmada_usuario = 1 WHERE codigo_mail_usuario = ? AND cuenta_confirmada_usuario = 0";
        const rows = await pool.query(query,[process.env.TABLA_USUARIOS,codigo]);
        
        if(rows.changedRows > 0){

            let query2 = "SELECT * FROM ?? WHERE codigo_mail_usuario = ?";
            const rows2 = await pool.query(query2,[process.env.TABLA_USUARIOS,codigo]);

            let mail = {
                to : rows2[0].mail_usuario,
                subject : "Activacion exitosa",
                html : "Gracias por activar tu cuenta, bienvenido a Forever Cinema."
            }

            let correo_ok = await correosModel.sendGenericEmail(mail);

            if(correo_ok) {
                return true;
            }
            else{
                return false;
            }
        }
        else {
            return false;
        }
    } 
    catch (error) {
        throw error; 
    }
}

module.exports = {
    registrar, 
    activar
}