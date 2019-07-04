const express = require('express');
import db from '../db'

const studentRouter = express.Router();

studentRouter.get('/', (req, res) => {
  db.all('Select * from Student Order by roll_no', (err, rows) => {
    if (rows) {
      res.json(rows);
    } else {
      res.error('Wrong request')
    }
  })
})

studentRouter.get('/:roll_no', (req, res) => {
  db.all('Select * from Student where roll_no=?', req.params.roll_no, (err, row) => {
    res.json(row)
  })
})

export default studentRouter;