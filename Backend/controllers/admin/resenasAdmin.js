const express = require('express');
const router = express.Router();
const resenasModel = require('../../models/resenasModel');

//Traer una reseña especifica
router.get('/:idResena', async (req, res, next) => {
    try {
        if(req.role == "admin"){

            let idResena = req.params.idResena;
            let getResena = await resenasModel.getResenaAdmin(idResena);

            if(getResena.length > 0){
                res.json({status : 'ok', data : getResena});
            }
            else {
                res.json({status : 'invalid', message : 'No hay reseñas'});
            }
        }
        else {
            res.status(401).json({status : 'Unauthorized'});
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({status : 'error'});
    }
})

//Traer todas las reseñas
router.get('/', async (req, res, next) => {
    try {
        if(req.role == "admin"){

            let getResenas = await resenasModel.getResenasAdmin();

            if(getResenas.length > 0){
                res.json({status : 'ok', data : getResenas});
            }
            else {
                res.json({status : 'invalid', message : 'No hay reseñas'});
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

//Actualizar el estado de una reseña
router.put('/:idResena', async (req, res, next) => {
    
    try {
        
        //La reseña tendra tres posibles estados
        //0 -> Pendiente de revision, 1 -> Aprobada, 2 -> Desaprobada

        if(req.role == "admin") {
            let idResena = req.params.idResena;
            let estadoResena = req.body.aprobada_resena; 
            let update_ok = await resenasModel.updateResena(idResena, estadoResena);
            
            if(update_ok){
                res.json({status : 'ok'});
            }
            else {
                res.json({status : 'invalid', message : 'Reseña inexistente'});
            }
        }
        else {
            res.status(401).json({ status : 'Unauthorized'});
        }
    } 
    catch (error) {
        res.json(500).json({status : 'error'});
    }

})


module.exports = router;