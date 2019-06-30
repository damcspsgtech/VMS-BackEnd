const express = require('express');
const sqlite = require('sqlite3');
const fs = require('fs');

var jsonString = fs.readFileSync('src/backupStore/config.json','utf8');

var db = new sqlite.Database('./src/routes/VivaManagementSystem.db');
const setting = JSON.parse(jsonString);

settingRouter = express.Router();

SemDetails = (sem_type) =>{
    var temp = {"Dept":[]};
    for(itr=0;itr<setting.Dept.length;itr++){
        for(i=0;i<setting.Dept[itr]["sem"].length;i++){
             if(setting.Dept[itr]["sem"][i]==sem_type){
                 temp.Dept.push(setting.Dept[itr])
             }
         }   
     }
     return temp;
}

settingRouter.get('/',(req,res)=>{
    res.send(setting)
});

settingRouter.get('/:sem_type',(req,res)=>{
    res.send(SemDetails(req.params.sem_type));
});


module.exports = settingRouter;