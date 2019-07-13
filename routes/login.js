const express = require('express');
const db = require('../config/db');

const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
  req.session.userid = req.body.username;
  db.faculty.findOne({ where: { id: req.body.username } }).then(data => {
    if (data) {
      if (data.dataValues.pass === req.body.password) {
        req.session.user = data.dataValues.id;
        req.session.role = data.dataValues.role;
        req.session.isguide = data.dataValues.is_guide;
        console.log('Session Items:', req.session.user, ' ', req.session.role, ' ', req.session.isguide);
        res.send('success');
      } else {
        res.send('Wrong credentials')
      }
    } else {
      res.send('No user found');
    }
  })
});


module.exports = loginRouter;