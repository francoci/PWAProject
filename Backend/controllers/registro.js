const express = require('express');
const router = express.Router();
const registroModel = require('../models/registroModel');

// Registro de usuario
const uuid = require('uuid');
const md5 = require('md5');

//Para subida de la imagen
const multer = require('multer');
const upload = multer({dest : './public/images/users/'});
const fs = require('fs');


//Para activar la cuenta
router.post('/:codigoConfirmacion', async(req,res,next) => {
    
    try {

        let codigoConfirmacion = req.params.codigoConfirmacion
        let activacion_ok = await registroModel.activar(codigoConfirmacion);

        if(activacion_ok) {
            res.json({status : 'ok', message : 'Cuenta activada.'});
        } 
        else {
            res.json({status:"invalid"});
        }
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({status:"error"});
    }

})


//Para registrarse
router.post('/', upload.array('file',1), async(req,res,next) => {
    
    try {

        let obj = {
            nombre_usuario : req.body.nombre,
            apellido_usuario : req.body.apellido,
            mail_usuario : req.body.mail,
            password_usuario : md5(req.body.password),
            imagen_usuario : uuid(),
            codigo_mail_usuario : uuid()
        }

        //Verifico que el tipo de imagen sea valido
        if(req.files[0].mimetype == 'image/jpeg' || req.files[0].mimetype == 'image/png')
        {
            let ext = req.files[0].mimetype.split('/');
            ext = "." + ext[1];

            //Leo la imagen temporal de la carpeta y la guardo con el nombre nuevo (uuid)
            fs.createReadStream('./public/images/users/'+req.files[0].filename).pipe(fs.createWriteStream('./public/images/users/'+ obj.imagen_usuario + ext));

            //Borro la imagen temporal, dejando solo la final
            fs.unlink('./public/images/users/' + req.files[0].filename, err => {
                if(err){
                    console.log(err);
                }
            });

            obj.imagen_usuario = 'images/users/' + obj.imagen_usuario + ext;

            //LLamo al model registro para postear el usuario nuevo
            let registro_ok = await registroModel.registrar(obj);
    
            if(registro_ok == 0) {
                res.json({status : 'ok', message : 'Se envio un correo a tu cuenta de mail'});
            } 
            else {
                if(registro_ok == 1) {
                    res.json({status : 'invalid', message : 'Mail ya en uso.'});
                }
                else {
                    res.status(500).json({status:"error"});
                }
            }
        }
        else {
            res.json({status : 'invalid', message : 'Formato no permitido.'});
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({status:"error"});
    }

})

module.exports  = router; 