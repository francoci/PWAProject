const express = require('express');
const router = express.Router();
const peliculasModel = require('../../models/peliculasModel');

//Para generer id unico para la imagen
const uuid = require('uuid');
const md5 = require('md5');

//Para subida de la imagen
const multer = require('multer');
const upload = multer({dest : './public/images/peliculas/'});
const fs = require('fs');

//Publicar una pelicula
router.post('/', upload.array('file',1), async(req,res,next) => {
    
    try {
        console.log("ENTRE ACA");
        if(req.role == "admin") {
            
            
            let genero = parseInt(req.body.genero);

            let obj = {
                nombre_pelicula : req.body.nombre,
                ano_pelicula : req.body.ano,
                id_genero_pelicula : genero,
                sinopsis_pelicula : req.body.sinopsis,
                director_pelicula : req.body.director,
                imagen_pelicula : uuid() 
            }

            //Verifico que el tipo de imagen sea valido
            if(req.files[0].mimetype == 'image/jpeg' || req.files[0].mimetype == 'image/png')
            {
                let ext = req.files[0].mimetype.split('/');
                ext = "." + ext[1];

                //Leo la imagen temporal de la carpeta y la guardo con el nombre nuevo (uuid)
                fs.createReadStream('./public/images/peliculas/'+req.files[0].filename).pipe(fs.createWriteStream('./public/images/peliculas/'+ obj.imagen_pelicula + ext));

                //Borro la imagen temporal, dejando solo la final
                fs.unlink('./public/images/peliculas/' + req.files[0].filename, err => {
                    if(err){
                        console.log(err);
                    }
                });

                obj.imagen_pelicula = 'images/peliculas/' + obj.imagen_pelicula + ext;

                //Llamo al model de peliculas para hacer el POST
                let post_pelicula = await peliculasModel.postPelicula(obj);

                if(post_pelicula) {
                    res.json({status : 'ok', id_pelicula : post_pelicula});
                }
                else {
                    res.json({status : 'invalid'});
                }

            }
            else {
                res.json({status : 'invalid', message : 'Formato no permitido.'});
            }

        }
        else {
            res.status(401).json({ status : 'Unauthorized'});
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ status : 'error'});
    }
})

//Marcar pelicula como visible
router.put('/visible/:idPelicula', async (req, res, next) => {
    try {
        if(req.role == "admin") {
    
            let idPelicula = req.params.idPelicula;
            let visible = parseInt(req.body.visible);

            console.log("ID: " + idPelicula + "VISIBLE: " + visible);

            let put_pelicula = await peliculasModel.putPeliculaVisible(idPelicula,visible);

            if(put_pelicula) {
                res.json({status : 'ok', id_pelicula : idPelicula});
            }
            else {
                res.json({status : 'invalid'});
            }

        }
        else {
            res.status(401).json({ status : 'Unauthorized'});
        }
    } 
    catch (error) {
        res.status(500).json({ status : 'error'});
    }
})

//Actualizar una pelicula
router.put('/:idPelicula', async (req, res, next) => {
    try {
        if(req.role == "admin") {
            
            let idPelicula = req.params.idPelicula;

            let obj = {
                nombre_pelicula : req.body.nombre,
                ano_pelicula : req.body.ano,
                id_genero_pelicula : req.body.genero,
                sinopsis_pelicula : req.body.sinopsis,
                director_pelicula : req.body.director,
                imagen_pelicula : req.body.imagen,
                visible_pelicula : req.body.visible 
            }

            let put_pelicula = await peliculasModel.putPelicula(idPelicula,obj);

            if(put_pelicula) {
                res.json({status : 'ok', id_pelicula : idPelicula});
            }
            else {
                res.json({status : 'invalid'});
            }

        }
        else {
            res.status(401).json({ status : 'Unauthorized'});
        }
    } 
    catch (error) {
        res.status(500).json({ status : 'error'});
    }
})

module.exports = router;