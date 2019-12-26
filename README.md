# PWAProject
Proyecto realizado para el curso Programador Web Avanzado. Los archivos disponibles corresponden con los del Frontend (Angular), Backend (Node.JS - Express) y un archivo SQL con la base de datos, dentro de las respectivas carpetas. Para correrlo, descargar todo e iniciar un servidor local. 

Mediante PHPMyAdmin u otro gestor de BD crear la base e importar las tablas con el archivo SQL. Luego, inicializar el backend mediante la terminal con el comando "nodemon npm start". Por ultimo, inicializar el Frontend con el comando "ng serve --open".

El sitio consiste en una página web de peliculas, en la cual se pueden realizar reseñas de las mismas. Existen dos tipos de usuarios, el usuario comun y el usuario del tipo admin.

Para una persona que no este registrada, las siguientes secciones están disponibles:

  - Home (Con un slider y las ultimas peliculas agregadas)
  - Peliculas (Listado de todas las peliculas, con la posibilidad de filtrar por genero y ordenar por antiguedad)
  - Pagina de pelicula individual (Con las reseñas para la misma)
  - Perfil (Aunque no accesible mediante el navbar, debera agregar un /perfil/idUsuario en la URL). Aquí se muestran las reseñas más           recientes realizadas por el usuario y las peliculas que marcó como favoritas recientemente

Para registrarse, la persona debera acceder a la sección registro, accesible mediante el link del navbar. Una vez llenados los campos, recibira un mail con un link el cual deberá presionar para activar la cuenta. Una vez activada, podrá loguearse mediante la sección de login, accesible a través del navbar. Un usuario común, al loguearse, obtiene acceso a las siguientes funciones y/o secciones:

  - Las mismas secciones disponibles para personas no registradas. 
  - La pagina de pelicula individual tiene, adicionalmente a lo normal, un boton para generar una reseña y otro para marcar la pelicula       como favorita.
  - Tiene acceso a la sección perfil mediante un link en el navbar, que redirige a la pagina perfil propia.
  
  
Por ultimo, el usuario Admin. La forma de determinar si un usuario es admin es mediante un campo en la BD, el cual se tiene que actualizar manualmente. Es decir, aquel que tenga acceso a la BD debe modificar el valor del campo a mano para marcar un usuario como admin. El usuario Admin tiene acceso a las funciones normales, con el agregado de un panel de administrador, accesible mediante la navbar. 

En el panel de administrador, las siguientes secciones y/o funciones estan disponibles:

  - Cargar una pelicula, con su titulo, director, año, sinopsis, genero e imagen
  - Aprobar o rechazar las reseñas realizadas por usuarios. Las mismas no son publicas hasta ser aprobadas.
  - Modificar la visibilidad de las peliculas, es decir si deben aparecer en el sitio o no.
