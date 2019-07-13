const express = require('express');
const Student = require('../models/Students');

const studentRouter = express.Router();

studentRouter.get('/', (req, res) => {
  Student.findAll({ order: [['roll_no', 'ASC']], include: [{ model: Batch }] })
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