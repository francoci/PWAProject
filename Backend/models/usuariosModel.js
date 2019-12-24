const pool = require('../bd');

//Traer los datos de un usuario (Propio u otro)
async function getUsuario(idUser){
    try {
        let query = "SELECT nombre_usuario, apellido_usuario, imagen_usuario FROM ?? WHERE id_usuario = ?";
        const rows = await pool.query(query,[process.env.TABLA_USUARIOS,idUser]);
        return rows;
    } 
    catch (error) {
        throw error;    
    }
}

//Actualizar los datos de un usuario
async function updateUsuario(idUser, obj){
    try {
        let query = "UPDATE ?? SET ? WHERE id_usuario = ?";
        const rows = await pool.query(query,[process.env.TABLA_USUARIOS,obj,idUser]);
        return rows;
    } 
    catch (error) {
        throw error;    
    }
}

module.exports = {
    updateUsuario,
    getUsuario
}