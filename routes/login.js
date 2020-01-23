/*
* Handles response for the endpoint => /api/login/
*/
'use strict'
/*
* Imports
*/
const express = require('express');
const loginRouter = express.Router();
const db = require('../config/db');

/*
* Validates login.
*/
loginRouter.post('/', (req, res) => {
  req.session.userid = req.body.username;
  db.faculty.findOne({
    where: {
      id: req.body.username
    }
  }).then((user) => {
    if (user !== null && user !== undefined) {
      if (user.pass === req.body.password) {
        req.session.user = user.id;
        req.session.role = user.role;
        req.session.isguide = user.is_guide;
        res.send({
          result: 'success'
        });
      }
      else {
        res.send({
          result: 'failed-credentials'
        })
      }
    }
    else {
      res.send({
        result: 'failed-user-dne'
      });
    }
  })
});

/*
* Exports
*/
module.exports = loginRouter;