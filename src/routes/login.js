const express = require('express');
const sqlite3 = require('sqlite3');
const request = require('supertest');

const loginRouter = express.Router();
var db = new sqlite3.Database('./src/routes/VivaManagementSystem.db');

loginRouter.post('/', (req, res) => {

  db.get('Select * From User where user_id = ?', [req.body.user_name], (err, rows) => {
    if (!rows) {
      res.send('Wrong Credentials');
    } else {
      if (rows.user_pass === req.body.password) {
        res.send('Success');
      } else {
        res.send('Wrong Password');
      }
    }
  });
});


module.exports = loginRouter;