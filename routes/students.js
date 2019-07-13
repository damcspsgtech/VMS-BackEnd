const express = require('express');
const db = require('../config/db');

const studentRouter = express.Router();

studentRouter.get('/', (req, res) => {
  db.student.findAll({ order: [['roll_no', 'ASC']], include: [{ model: Batch }] })
    .then((student_list) => {
      res.send(student_list);
    })
})

studentRouter.get('/:roll_no', (req, res) => {
  db.all('Select * from Student where roll_no=?', req.params.roll_no, (err, row) => {
    res.json(row)
  })
})

module.exports = studentRouter;