/*
* Handles response for the endpoint => /api/faculty/
*/
'use strict'
/*
* Imports
*/
const express = require('express');
const facultyRouter = express.Router();

/*
* Retrieves Faculty List.
*/
facultyRouter.get('/', (req, res) => {
});

/*
* Retrieves Faculty member's data.
*/
/*
facultyRouter.get('/:employee_id', (req, res) => {
  db.each('Select * from Faculty where employee_id=?', req.params.employee_id, (err, row) => {
    res.json(row);
  })
});
*/

/*
* Exports
*/
module.exports = facultyRouter;