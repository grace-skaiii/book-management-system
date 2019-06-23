var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
var createError = require('http-errors');
var path = require('path'); 
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var ejs=require('ejs');
var indexRouter = require('./routes/index');
// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({ 
  secret: 'secret',
  resave: false,
  cookie:{ 
      maxAge: 1000*60*30,
  },
  saveUninitialized: false 
}));
app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, '/public')));
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
app.listen(3306,'127.0.0.1');
