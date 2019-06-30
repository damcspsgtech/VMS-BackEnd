const express = require('express');
const sqlite = require('sqlite3');

const studentRouter = express.Router();

var db = new sqlite.Database('./src/routes/VivaManagementSystem.db',(err)=>{
    if(err){
        return console.error(err.message);
    }
});

studentRouter.get('/',(req,res)=>{
    db.all('Select * from Student Order by roll_no',(err,rows)=>{
        if(rows){
            res.json(rows);
        }else{
            res.error('Wrong request')
        }
    })
})

studentRouter.get('/:roll_no',(req,res)=>{
    db.all('Select * from Student where roll_no=?',req.params.roll_no,(err,row)=>{
        res.json(row)
    })
})

module.exports = studentRouter;