/*
* Imports
*/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

/*
* Routes
*/
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const studentsRouter = require('./routes/students');
const settingRouter = require('./routes/settings');
const facultyRouter = require('./routes/faculty');

/*
* Database
*/
const db = require('./config/connection');

//Test Database

db
  .authenticate()
  .then(() => {
    console.log('Database Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

/*
* Database Refresh
*
* Purges all data and recreates tables without migrations.
*/
const refresh = require('./config/refresh_db')

/*
* Spreadsheet Refreshes
* 
* Use these modules to refresh db based on the google spreadsheet
*/
const student_gs = require('./config/student_spreadsheet')
const faculty_gs = require('./config/faculty_spreadsheet')

//Init app as express object
const app = express();

//Configure app
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: false,
  resave: false,
  store: new SequelizeStore({
    db: db,
  })
}))

app.use('/', indexRouter);
app.use('/api/students', studentsRouter);
app.use('/api/faculty', facultyRouter);
app.use('/api/login', loginRouter);
app.use('/api/settings', settingRouter);

module.exports = app;

