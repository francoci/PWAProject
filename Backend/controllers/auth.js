const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const fs = require('fs');

const authModel = require('../models/authModel');

//Para realizar el login
router.post('/login',async(req,res,next)=> {

    try {

        let login_usr = await authModel.loginUser(req.body.user, md5(req.body.password));
        
        if(login_usr.length > 0 ) {

            if(login_usr[0].cuenta_confirmada_usuario == 1)
            {
                const privateKey = fs.readFileSync('./claves/privada.pem','utf-8');
            
                let signOptions = {
                    expiresIn : "2h",
                    algorithm : "RS256"
                }
                
                var usuario = {};

                if(login_usr[0].permisos_usuario == 0){
                    // Login de un usuario comun
                    var payload = {id : login_usr[0].id_usuario, role : 'user'};
                    usuario = {id : login_usr[0].id_usuario, nombre : login_usr[0].nombre_usuario, role : 'user'};
                } 
                else {
                    // Login de un usuario administrador
                    var payload = {id : login_usr[0].id_usuario, role : 'admin'};
                    usuario = {id : login_usr[0].id_usuario, nombre : login_usr[0].nombre_usuario, role : 'admin'};
                }

                const token = jwt.sign(payload,privateKey,signOptions);

                res.json({status : 'ok',usuario, JWT : token});
            }
            else
            {
                res.json({status : 'invalid', message : 'Cuenta no confirmada, revise su mail.'});
            }
            
        } 
        else {
            res.json({status : 'invalid', message : 'Usuario o contraseña incorrectos.'})
        }
    } 
    catch(error) {
        console.log(error);
        res.status(500).json({status : 'error'});
    }
    
});


module.exports = router;