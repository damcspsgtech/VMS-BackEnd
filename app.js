//Imports
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Routes
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const studentsRouter = require('./routes/students');
const settingRouter = require('./routes/settings');
const facultyRouter = require('./routes/faculty');

//Database
const db = require('./config/connection');
const conn = require('./config/refresh_db')

//Test Database
db
  .authenticate()
  .then(() => {
    console.log('Database Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//Init app as express object
const app = express();


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//app.engine('html');
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/api/students', studentsRouter);
app.use('/api/faculty', facultyRouter);
app.use('/api/login', loginRouter);
app.use('/api/settings', settingRouter);

/*
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
module.exports = app;

