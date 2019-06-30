const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');

app = express.Router();

var db = new sqlite3.Database('./src/routes/VivaManagementSystem.db',(err)=>{
    if(err){
        return console.error(err.message);
    }
    console.log("Connected");
});

app.get('/',(req,res)=>{
    res.send('No api found');
})

module.exports = app;