const pool = require('../bd');

//Traer las reseñas de un usuario
async function getResenasProfile(idUsuario){
    try {
        let query = "SELECT id_resena, puntaje_resena, texto_resena, spoilers_resena, fecha_resena, nombre_pelicula, ano_pelicula FROM ?? INNER JOIN ?? ON id_pelicula_resena = id_pelicula WHERE id_usuario_resena = ? AND aprobada_resena = 1 ORDER BY id_resena DESC LIMIT 3";
        
        const rows = await pool.query(query,[process.env.TABLA_RESENAS, process.env.TABLA_PELICULAS, idUsuario]);
        
        return rows;
    } 
    catch(error) {
        throw error;
    }
}

async function getPeliculasProfile(idUsuario){
    try {
        let query = "SELECT * FROM ?? INNER JOIN ?? ON id_pelicula_favorito = id_pelicula WHERE id_usuario_favorito = ? ORDER BY id_favorito DESC LIMIT 6";
        
        const rows = await pool.query(query,[process.env.TABLA_PELICULAS, process.env.TABLA_FAVORITOS, idUsuario]);
        
        return rows;
    } 
    catch(error) {
        throw error;
    }
}

module.exports = {
    getResenasProfile,
    getPeliculasProfile
}