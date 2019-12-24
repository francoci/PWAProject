const pool = require('../bd');

//Determinar si una pelicula es favorita para el usuario
async function getFavorito(obj) {
    try {
        
        let query = "SELECT * FROM ?? WHERE id_usuario_favorito = ? AND id_pelicula_favorito = ? LIMIT 1";
        const rows = await pool.query(query,[process.env.TABLA_FAVORITOS, obj.id_usuario_favorito, obj.id_pelicula_favorito]);
        return rows;

    } catch (error) {
        throw error;
    }
}

//Marcar pelicula como favorita
async function postFavorito(idUser, idPelicula) {
    try {
        let query = "INSERT INTO ?? SET id_usuario_favorito = ?, id_pelicula_favorito = ?";
        const rows = await pool.query(query,[process.env.TABLA_FAVORITOS, idUser, idPelicula]);
        return rows.insertId;

    } catch (error) {
        throw error;
    }
}

//Eliminar pelicula de lista de favoritas
async function deleteFavorito(idUser, idPelicula) {
    try {
        let query = "DELETE FROM ?? WHERE id_usuario_favorito = ? AND id_pelicula_favorito = ?";
        const rows = await pool.query(query,[process.env.TABLA_FAVORITOS, idUser, idPelicula]);
        return rows;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    postFavorito,
    deleteFavorito,
    getFavorito
}