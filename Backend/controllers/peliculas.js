var express = require('express');
var router = express.Router();
const peliculasModel = require('../models/peliculasModel');
const resenasModel = require('../models/resenasModel');


//Traer peliculas filtradas
router.get('/filtro', async (req, res, next) => {
    try {
        
        let obj = {
            genero : req.query.gen,
            antiguedad : req.query.ant
        }
        
        let peliculas = await peliculasModel.getPeliculasFiltro(obj);

        res.json({ status : 'ok', data : peliculas});
    } 
    catch(error) {
        res.status(500).json({status : 'error'});
        throw error;
    }
});

//Traer mas nuevas
router.get('/home', async (req, res, next) => {
    try {
        let peliculas = await peliculasModel.getPeliculasHome();
        res.json({ status : 'ok', data : peliculas});
    } 
    catch(error) {
        res.status(500).json({status : 'error'});
        throw error;
    }
});

//Traer todos las peliculas
router.get('/', async (req, res, next) => {
    try {
        let peliculas = await peliculasModel.getPeliculas();
        res.json({ status : 'ok', data : peliculas});
    } 
    catch(error) {
        res.status(500).json({status : 'error'});
        throw error;
    }
});

//Traer una pelicula
router.get('/:idPelicula', async (req, res, next) => {
    try {
        let pelicula = await peliculasModel.getPelicula(req.params.idPelicula);
        res.json({ status : 'ok', data : pelicula});
    } 
    catch(error) {
        res.status(500).json({status : 'error'});
        throw error;
    }
});

//Traer las reseñas de una pelicula
router.get('/resenas/:idPelicula', async (req, res, next) => {
    try {
        
        let idPelicula = req.params.idPelicula;

        let resenas = await resenasModel.getResenas(idPelicula);

        if(resenas.length > 0)
        {
            res.json({status : 'ok', data : resenas});
            
        }
        else {
            res.json({status : 'invalid', message : 'No hay reseñas'});
        }
    } 
    catch (error) {
        res.status(500).json({status : 'error'});
    }
})

module.exports = router;