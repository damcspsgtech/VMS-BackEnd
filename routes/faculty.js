const express = require('express');
const facultyRouter = express.Router();
const db = require('../config/connection');

// Get Faculty List
facultyRouter.get('/', (req, res) => {
});

/*
facultyRouter.get('/:employee_id', (req, res) => {
  db.each('Select * from Faculty where employee_id=?', req.params.employee_id, (err, row) => {
    res.json(row);
  })
});
*/
module.exports = facultyRouter;