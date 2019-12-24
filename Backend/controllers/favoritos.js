const express = require('express');
const router = express.Router();
const favoritosModel = require('../models/favoritosModel');


//Para determinar si una pelicula es favorita
router.get('/:idPelicula', async (req, res, next) => {
    try {

        if(req.role == "user" || req.role == "admin"){
            
            let obj = {
                id_usuario_favorito : req.id,
                id_pelicula_favorito : req.params.idPelicula
            }

            let getFavorito = await favoritosModel.getFavorito(obj);

            if(getFavorito.length != 0){
                res.json({status : 'ok', favorito : '1'});
            }
            else {
                res.json({status : 'invalid', favorito : '0'});
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

//Para eliminar una pelicula de la lista de favoritos
router.delete('/:idPelicula', async (req, res, next) => {
    try {

        if(req.role == "user" || req.role == "admin"){
            
            let idUser = req.id;
            let idPelicula = req.params.idPelicula;
            
            let deleteFavorito = await favoritosModel.deleteFavorito(idUser, idPelicula);

            if(deleteFavorito){
                res.json({status : 'ok'});
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

//Para marcar una pelicula como favorita
router.post('/:idPelicula', async (req, res, next) => {
    try {
        if(req.role == "user" || req.role == "admin"){
            
            let idUser = req.id;
            let idPelicula = req.params.idPelicula;
            
            let postFavorito = await favoritosModel.postFavorito(idUser, idPelicula);
 
            if(postFavorito){
                res.json({status : 'ok', idFavorito : postFavorito});
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