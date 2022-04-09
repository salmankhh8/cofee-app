var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors= require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reviewsRouter = require('./routes/review');
var registerRouter = require('./routes/register');
var uploadRouter = require("./routes/upload");
var imageRouter = require('./routes/productImage')
var testImageRouter = require('./routes/imageURLTest')
var bodyParser = require('body-parser');
var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors()) 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/profile',express.static('upload/images'))

// middlewearer
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reviews', reviewsRouter);
app.use('/register', registerRouter);
app.use('/upload', uploadRouter);
app.use('/productimage', imageRouter);
app.use('/testimage', testImageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// var mongoose = require('mongoose');
// require("dotenv/config")

// mongoose.connect(process.env.DB_connection, ()=>console.log("mongodb connected"))


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
