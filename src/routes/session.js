const express = require('express');
const sqlite3 = require('sqlite3');

const sessionRoute = express.Router();

const db = new sqlite3.Database('./src/routes/VivaManagementSystem.db');

sessionRoute.post('/',(req,res)=>{
    
});