const express = require('express');
const sqlite3 = require('sqlite3');

const facultyRouter = express.Router();

var db = new sqlite3.Database('./src/routes/VivaManagementSystem.db', (err)=>{
    if(err){
        console.log(err);
    }
});

facultyRouter.get('/', (req,res)=>{
    db.all(`Select * from Faculty where employee_id != \'admin\'`,(err,rows)=>{
        res.json(rows);
    });
});

facultyRouter.get('/:employee_id',(req,res)=>{
    db.each('Select * from Faculty where employee_id=?',req.params.employee_id,(err,row)=>{
        res.json(row);
    })
});

module.exports = facultyRouter;