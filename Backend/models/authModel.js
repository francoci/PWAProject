const pool = require('../bd');

//Para validar el login
async function loginUser(username,password) {
    try{
        let query = "SELECT id_usuario, permisos_usuario, nombre_usuario, cuenta_confirmada_usuario FROM ?? WHERE mail_usuario = ? AND password_usuario = ?";
        
        const rows = await pool.query(query,[process.env.TABLA_USUARIOS,username,password]);

        return rows;

    } catch(error) {
        throw error;
    }
}

module.exports = {
    loginUser
}