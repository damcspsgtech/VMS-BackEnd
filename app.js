/*
*
*/
'use strict'
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

require('dotenv').config();

/*
* Import Routes
*/
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const studentsRouter = require('./routes/students');
const settingRouter = require('./routes/settings');
const facultyRouter = require('./routes/faculty');
const allotmentRouter = require('./routes/allotment');
/*
* Data Access Object.
* 
* xD
*/

const db = require('./config/db');

/*
* Test database connection
*/
db.sequelize
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
* 
* *CAUTION*
* DO NOT UNCOMMENT IF YOU'D LIKE TO HOLD ON TO LEGACY DATA.
* YOU WILL NOT BE ABLE TO RETRIEVE DATA FROM OLDER GOOGLE SPREADSHEETS.
* IF YOU WISH TO DO SO UPDATE GOOGLE SHEET URLS THROUGH FRONTEND, AFTER THE PURGE.
*/
//const purge = require('./config/refresh_db')

/*
* Spreadsheet Refreshes
* 
* Use these modules to refresh db based on the google spreadsheet
* This is safe to disable. SYNC will provided through the frontend.
*/

//const sync_all = require('./config/sync')
//const student = require('./config/student_spreadsheet')
//const faculty = require('./config/faculty_spreadsheet')

/*
* Initialize *app* as express object
*/
const app = express();

/*
* App Configuration
*/
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

/*
* Session Store handled directly by sequelize.
*/
app.use(session({
	secret: 'keyboard cat',
	saveUninitialized: false,
	resave: false,
	cookie: {
		expires: 600000
	},
	store: new SequelizeStore({
		db: db.sequelize,
	})
}))



// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
	if (req.cookies.id && !req.session.id) {
		res.clearCookie('id');
		res.clearCookie('name')
		res.clearCookie('role')
	}
	next();
});




/*
*
* Defined Routes
*
* Add custom routes here.
* Use /api/ convention. Check out the API documentation.
* 
* REST API handlers will be added later
*
*/

app.use('/api/index', indexRouter);
app.use('/api/students', studentsRouter);
app.use('/api/faculty', facultyRouter);
app.use('/api/login', loginRouter);
app.use('/api/settings', settingRouter);
app.use('/api/allotment', allotmentRouter);
/*
* Exports
*/
module.exports = app;

