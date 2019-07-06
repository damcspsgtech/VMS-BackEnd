const express = require('express');
const db = require('../config/connection')

const loginRouter = express.Router();

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