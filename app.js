var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./app_server/models/db');

//var indexRouter = require('./APP_SERVER/routes/index');
var usersRouter = require('./APP_SERVER/routes/users');
var apiRouter = require('./APP_API/routes/trip');

var app = express();

//View Engine Setup
//app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

//CORS Policy
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'APP_PUBLIC', 'build')))


//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

//Catch 404 & Forward to Error Handler
app.use(function(req, res, next) {
  next(createError(404));
});

//Error Handler
app.use(function(err, req, res, next) {
  // Set locals, only Providing Error in Development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //Render the Error Page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
