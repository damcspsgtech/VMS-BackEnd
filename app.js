const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const debug = require('debug');



const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', require('./src/routes/index'));
app.use('/api/students', require('./src/routes/students'));
app.use('/api/faculty', require('./src/routes/faculty'));
app.use('/api/login', require('./src/routes/login'));
app.use('/api/setting', require('./src/routes/setting'));

app.listen(port, () => {
  debug(`Listening to port ${port}`);
});