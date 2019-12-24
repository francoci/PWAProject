const pool = require('../bd');

//Para traer todas las peliculas
async function getPeliculas(){
    try {
        let query = "SELECT * FROM ?? INNER JOIN ?? ON id_genero_pelicula = id_genero WHERE visible_pelicula = 1";
        const rows = await pool.query(query,[process.env.TABLA_PELICULAS, process.env.TABLA_GENEROS]);
        return rows;
    } 
    catch (error) {
        throw error;
    }
}

//Para traer peliculas mas nuevas
async function getPeliculasHome(){
    try {
        let query = "SELECT * FROM ?? INNER JOIN ?? ON id_genero_pelicula = id_genero WHERE visible_pelicula = 1 ORDER BY id_pelicula DESC LIMIT 12";
        const rows = await pool.query(query,[process.env.TABLA_PELICULAS, process.env.TABLA_GENEROS]);
        return rows;
    } 
    catch (error) {
        throw error;
    }
}

//Para traer peliculas filtradas
async function getPeliculasFiltro(obj){
    try {
        let query = "";
        let rows = "";

        if(obj.antiguedad == 1 && obj.genero != 0) {
            query = "SELECT * FROM ?? INNER JOIN ?? ON id_genero_pelicula = id_genero WHERE id_genero = ? AND visible_pelicula = 1 ORDER BY ano_pelicula DESC";
            console.log("Genero: " +obj.genero+", Antiguedad: DESC");

            rows = await pool.query(query,[process.env.TABLA_PELICULAS, process.env.TABLA_GENEROS,obj.genero]);
        }
        
        if(obj.antiguedad != 1 && obj.genero != 0) {
                query = "SELECT * FROM ?? INNER JOIN ?? ON id_genero_pelicula = id_genero WHERE id_genero = ? AND visible_pelicula = 1 ORDER BY ano_pelicula ASC";
            console.log("Genero: " +obj.genero+", Antiguedad: ASC");  

            rows = await pool.query(query,[process.env.TABLA_PELICULAS, process.env.TABLA_GENEROS,obj.genero]);
        }

        if(obj.antiguedad == 1 && obj.genero == 0) {
            query = "SELECT * FROM ?? INNER JOIN ?? ON id_genero_pelicula = id_genero WHERE visible_pelicula = 1 ORDER BY ano_pelicula DESC";
            console.log("Genero: " +obj.genero+", Antiguedad: DESC");

            rows = await pool.query(query,[process.env.TABLA_PELICULAS, process.env.TABLA_GENEROS]);
        }

        if(obj.antiguedad != 1 && obj.genero == 0) {
            query = "SELECT * FROM ?? INNER JOIN ?? ON id_genero_pelicula = id_genero WHERE visible_pelicula = 1 ORDER BY ano_pelicula ASC";
            console.log("Genero: " +obj.genero+", Antiguedad: ASC");

            rows = await pool.query(query,[process.env.TABLA_PELICULAS, process.env.TABLA_GENEROS]);
        }
         
        return rows;
    } 
    catch (error) {
        throw error;
    }
}

//Para traer una pelicula
async function getPelicula(idPelicula){
    try {
        let query = "SELECT * FROM ?? INNER JOIN ?? ON id_genero_pelicula = id_genero WHERE id_pelicula = ?";
        const rows = await pool.query(query,[process.env.TABLA_PELICULAS, process.env.TABLA_GENEROS, idPelicula]);
        return rows;
    } 
    catch (error) {
        throw error;
    }
}

//Para publicar una pelicula
async function postPelicula(obj){
    try {
        let query = "INSERT INTO ?? SET ?";
        const rows = await pool.query(query,[process.env.TABLA_PELICULAS, obj]);
        return rows.insertId;
    } 
    catch(error) {
        throw error;
    }
}

//Para actualizar una pelicula
async function putPelicula(idPelicula, obj){
    try {
        let query = "UPDATE ?? SET ? WHERE id_pelicula = ?";
        const rows = await pool.query(query,[process.env.TABLA_PELICULAS,obj,idPelicula]);
        return rows; 
    } 
    catch (error) {
        throw error; 
    }
}

//Para marcar pelicula como visible
async function putPeliculaVisible(idPelicula, visible){
    try {
        let query = "UPDATE ?? SET visible_pelicula = ? WHERE id_pelicula = ?";
        const rows = await pool.query(query,[process.env.TABLA_PELICULAS,visible,idPelicula]);
        return rows; 
    } 
    catch (error) {
        throw error; 
    }
}

//Para eliminar una pelicula (No usada, actualizamos el atributo visible con el PUT)
async function deletePelicula(idPelicula){
    try {
        let query = "DELETE FROM ?? WHERE id_pelicula = ?";
        const rows = await pool.query(query,[process.env.TABLA_PELICULAS,idPelicula]);
        return rows; 
    } 
    catch (error) {
        throw error; 

    }
}


module.exports = {
    getPeliculas,
    getPeliculasFiltro,
    getPeliculasHome,
    getPelicula,
    putPelicula,
    putPeliculaVisible,
    postPelicula,
    deletePelicula
}