var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const fs = require('fs');

//Rutas normales
const peliculasRouter = require('./controllers/peliculas');
const authRouter = require('./controllers/auth');
const registroRouter = require('./controllers/registro');
const profileRouter = require('./controllers/profile');

//Rutas protegidas (Usuario normal)
const resenasRouter = require('./controllers/resenas');
const usuariosRouter = require('./controllers/usuarios');
const favoritosRouter= require('./controllers/favoritos');

//Rutas protegidas (Admin) 
const peliculasAdminRouter = require('./controllers/admin/peliculasAdmin');
const resenasAdminRouter = require('./controllers/admin/resenasAdmin');


// var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({ limit: '50Mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

secured = (req,res,next) => {
  try {
    let token = req.headers.authorization; 
  
    token = token.replace('Bearer ','');
    const publicKey = fs.readFileSync('./claves/publica.pem');
    let decoded = jwt.verify(token, publicKey);
  
    req.id = decoded.id;
    req.role = decoded.role;
    next();
  } 
  catch (error) {
    res.status(401).json({status : 'Unauthorized'});
  }
}
  
securedAdmin = (req,res,next) => {
  try {
    let token = req.headers.authorization; 

    token = token.replace('Bearer ','');
    const publicKey = fs.readFileSync('./claves/publica.pem');
    var decodedAdmin = jwt.verify(token, publicKey);

    req.id_admin = decodedAdmin.id;
    req.role = decodedAdmin.role;
    next();
  } 
  catch (error) {
    console.log(error);
    res.status(401).json({status : 'Unauthorized'});
  }
}

//Definicion de las rutas
app.use('/peliculas', peliculasRouter);
app.use('/auth', authRouter);
app.use('/registro', registroRouter);
app.use('/profile', profileRouter);

//Rutas protegidas (Usuario normal)
app.use('/resenas', secured, resenasRouter);
app.use('/usuarios', secured, usuariosRouter);
app.use('/favoritos', secured, favoritosRouter);

//Rutas protegidas (Usuario admin)
app.use('/peliculasAdmin', securedAdmin, peliculasAdminRouter);
app.use('/resenasAdmin', securedAdmin, resenasAdminRouter);

// app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
