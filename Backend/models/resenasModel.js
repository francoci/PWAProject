const pool = require('../bd');

//Traer las reseñas para una pelicula
async function getResenas(idPelicula){
    try {
        let query = "SELECT id_resena, id_usuario, imagen_usuario, nombre_usuario, apellido_usuario, puntaje_resena, texto_resena, spoilers_resena, fecha_resena FROM ?? INNER JOIN ?? ON id_usuario_resena = id_usuario WHERE id_pelicula_resena = ? AND aprobada_resena = 1";
        
        const rows = await pool.query(query,[process.env.TABLA_RESENAS, process.env.TABLA_USUARIOS, idPelicula]);
        
        return rows;
    } 
    catch(error) {
        throw error;
    }
}

//Traer las reseñas pendientes de revision
async function getResenasAdmin(){
    try {
        let query = "SELECT id_resena, nombre_usuario, apellido_usuario, puntaje_resena, texto_resena, spoilers_resena, fecha_resena, nombre_pelicula FROM ?? INNER JOIN ?? ON id_usuario_resena = id_usuario INNER JOIN ?? ON id_pelicula_resena = id_pelicula WHERE aprobada_resena = 0";
        
        const rows = await pool.query(query,[process.env.TABLA_RESENAS, process.env.TABLA_USUARIOS, process.env.TABLA_PELICULAS]);
        
        return rows;
    } 
    catch (error) {
       throw error; 
    }
}

//Traer una reseña pendiente de revision (Para aprobarla o no)
async function getResenaAdmin(idResena){
    try {
        let query = "SELECT id_resena, nombre_usuario, apellido_usuario, puntaje_resena, texto_resena, spoilers_resena, fecha_resena FROM ?? INNER JOIN ?? ON id_usuario_resena = id_usuario WHERE id_resena = ? AND aprobada_resena = 0";
        
        const rows = await pool.query(query,[process.env.TABLA_RESENAS, process.env.TABLA_USUARIOS, idResena]);
        
        return rows;
    } 
    catch (error) {
       throw error; 
    }
}

//Publicar una reseña
async function postResena(obj){
    try {
        let query = "INSERT INTO ?? SET ?";
        const rows = await pool.query(query,[process.env.TABLA_RESENAS, obj]);
        return rows.insertId;
    } 
    catch(error) {
        throw error;
    }
}

//Actualizar el estado de la reseña
//Estados: 0 -> Pendiente de revision, 1 -> Aprobada, 2 -> Desaprobada
async function updateResena(idResena, estadoResena){
    try {
        let query = "UPDATE ?? SET aprobada_resena = ? WHERE id_resena = ?";
        const rows = await pool.query(query,[process.env.TABLA_RESENAS, estadoResena, idResena]);
        return rows;
    } 
    catch (error) {
        throw error;
    }
}

module.exports = {
    postResena,
    getResenas,
    updateResena,
    getResenasAdmin,
    getResenaAdmin
}