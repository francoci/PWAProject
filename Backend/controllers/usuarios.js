const express = require('express');
const router = express.Router();
const md5 = require('md5');
const usuariosModel = require('../models/usuariosModel');

//Para subida de la imagen
const multer = require('multer');
const upload = multer({dest : './public/images/users/'});
const fs = require('fs');
const uuid = require('uuid');

//Actualizar datos del usuario
router.put('/', upload.array('file',1), async (req, res, next) => {
    try {
        if(req.role == "user") {
                
            let idUser = req.id;

            let obj = {
                nombre_usuario : req.body.nombre,
                apellido_usuario : req.body.apellido,
                password_usuario : md5(req.body.password),
                imagen_usuario : uuid()
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

                //LLamo al model usuario para actualizar los datos
                let put_usuario = await usuariosModel.updateUsuario(idUser, obj);
        
                if(put_usuario) {
                    res.json({status : 'ok', id_usuario : idUser});
                }
                else {
                    res.json({status : 'invalid'});
                }
            }
            else {
                res.json({status : 'invalid', message : 'Formato no permitido'});
            }

        }
        else {
            res.status(401).json({ status : 'Unauthorized'});
        }
    } 
    catch (error) {
        res.status(500).json({status : 'error'});
    }
})


//Traer los datos de un usuario (No propio)
router.get('/:idUser', async (req, res, next) => {
    try {
        if(req.role == "user") {

            let idUser = req.params.idUser;
            let getUser = await usuariosModel.getUsuario(idUser);

            if(getUser.length > 0) {
                res.json({status : 'ok', data : getUser});
            }
            else {
                res.json({status : 'invalid'});
            }
        }
        else {
            res.status(401).json({status : 'Unauthorized'});
        }
    } 
    catch (error) {
        res.status(500).json({status : 'error'});
    }
})


//Traer los datos de un usuario (Propio)
router.get('/profile', async (req, res, next) => {
    try {
        if(req.role == "user") {

            let idUser = req.id;
            let getUser = await usuariosModel.getUsuario(idUser);

            if(getUser.length > 0) {
                res.json({status : 'ok', data : getUser});
            }
            else {
                res.json({status : 'invalid'});
            }
        }
        else {
            res.status(401).json({status : 'Unauthorized'});
        }
    } 
    catch (error) {
        res.status(500).json({status : 'error'});
    }
})

module.exports  = router; 