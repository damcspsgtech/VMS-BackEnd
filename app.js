const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');



const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/',require('./src/routes/index'));
app.use('/login',require('./src/routes/loginRoutes.js'));

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
});