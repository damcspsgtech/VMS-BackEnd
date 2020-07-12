/*
* Handles response for the endpoint => /api/login/
*/
'use strict'
/*
* Imports
*/



const express = require('express');
const loginRouter = express.Router();
const repo = require('../repos');
const bcrypt = require('bcrypt')
//const db = require('../config/db');
/*
* Validates login.
*/

// Core module config 

loginRouter.post('/', (req, res) => {
  req.session.userid = req.body.username;

  if (req.body.username != 'admin') {
    repo.batchRepo.findActiveTutor(req.body.username).then((user) => {
      if (user !== null && user !== undefined) {
        console.log(user);
        if (bcrypt.compareSync(req.body.password, user.Tutor.password)) {
          req.session.user = user.Tutor.id;
          req.session.role = 'tutor';
          req.session.isguide = user.is_guide;
          res.send({
            result: 'success',
            userName: user.Tutor.id,
            role: 'tutor',
            batch: user.id,
          });

        }
        else {
          res.send({
            result: 'failed-user-dne'
          });
        }
      }
      else {
        res.send({
          result: 'failed-credentials'
        });

      }
    })

  }
  else {

    repo.facultyRepo.getFacultyById(req.body.username)
      .then((user) => {
        if (user !== null && user !== undefined) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            req.session.user = user.id;
            req.session.role = user.role;
            req.session.isguide = user.is_guide;
            res.send({
              result: 'success',
              userName: user.id,
              role: user.role,
              batch: ''
            });
          }
          else {
            res.send({
              result: 'failed-user-dne'
            });
          }
        }
        else {
          res.send({
            result: 'failed-credentials'
          });

        }

      })
      .catch((err) => {
        res.send({
          result: 'failed-credentials',
        })
      });
  }
})

/*
* Exports
*/
module.exports = loginRouter