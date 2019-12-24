const express = require('express');
const router = express.Router();
const usuariosModel = require('../models/usuariosModel');
const profileModel = require('../models/profileModel');

//Traer los datos de un usuario (No propio)
router.get('/:idUser', async (req, res, next) => {
    try {
        let idUser = req.params.idUser;
        let getUser = await usuariosModel.getUsuario(idUser);

        if(getUser.length > 0) {
            res.json({status : 'ok', data : getUser});
        }
        else {
            res.json({status : 'invalid'});
        }
    } 
    catch (error) {
        res.status(500).json({status : 'error'});
    }
})

//Traer las reseñas recientes de un usuario (No propio)
router.get('/resenas/:idUser', async (req, res, next) => {
    try {
        let idUser = req.params.idUser;
        let getResenas = await profileModel.getResenasProfile(idUser);

        if(getResenas.length > 0) {
            res.json({status : 'ok', data : getResenas});
        }
        else {
            res.json({status : 'invalid'});
        }
    } 
    catch (error) {
        res.status(500).json({status : 'error'});
    }
})


//Traer las peliculas favoritas recientes de un usuario (No propio)
router.get('/peliculas/:idUser', async (req, res, next) => {
    try {
        let idUser = req.params.idUser;
        let getPeliculas = await profileModel.getPeliculasProfile(idUser);

        if(getPeliculas.length > 0) {
            res.json({status : 'ok', data : getPeliculas});
        }
        else {
            res.json({status : 'invalid'});
        }
    } 
    catch (error) {
        res.status(500).json({status : 'error'});
    }
})

module.exports  = router; 