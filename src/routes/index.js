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

app.get('/studentDetails',(req,res)=>{
    db.all('Select * From Student Order by roll_no',(err,rows)=>{
        res.json(rows);
    });
});

module.exports = app;