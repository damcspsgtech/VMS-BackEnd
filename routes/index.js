/*
* Handles response for the endpoint => /
*/
'use strict'
/*
* Imports
*/
const express = require('express');
const indexRouter = express.Router();

/*
* 
*/

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.id && req.cookies.id) {
    res.redirect('/#/dashboard');
  } else {
    next();
  }
};

// route for Home-Page
indexRouter.get('/', sessionChecker, (req, res) => {
  res.redirect('/#/login');
});


module.exports = indexRouter;

/*
/*
* Retrieves appropriate session.

indexRouter.get('/:id', (req, res) => {
  req.session.u_id = req.params.id;
  if (req.session.u_id == 1) {
    console.log('Session:', req.session.u_id);
    res.send('Hello');
  }
  else {
    console.log(req.params.id, req.session.u_id);
    res.send('Session has been set');
  }
})

*/