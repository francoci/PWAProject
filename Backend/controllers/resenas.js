const express = require('express');
const router = express.Router();
const resenasModel = require('../models/resenasModel');

//Publicar una reseña para una pelicula
router.post('/:idPelicula', async (req, res, next) => {
    try {

        if(req.role == "user" || req.role == "admin") {

            let idPelicula = req.params.idPelicula;
            let idUser = req.id;
            let puntaje = parseInt(req.body.puntaje);

            let obj = {
                id_usuario_resena : idUser,
                id_pelicula_resena : idPelicula,
                puntaje_resena : puntaje,
                texto_resena : req.body.texto
                // spoilers_resena : req.body.spoilers
            }

            let resena_ok = await resenasModel.postResena(obj);

            if(resena_ok) {
                res.json({status : 'ok', id_resena : resena_ok});
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

module.exports = router;