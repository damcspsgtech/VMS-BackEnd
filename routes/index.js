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
indexRouter.get('/', (req, res) => {
  res.send('No api found');
})

/*
* Retrieves appropriate session.
*/
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

module.exports = indexRouter;