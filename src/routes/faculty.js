import express from 'express';
import db from '../db'

const facultyRouter = express.Router();

facultyRouter.get('/', (req, res) => {
  db.all(`Select * from Faculty where employee_id != \'admin\'`, (err, rows) => {
    res.json(rows);
  });
});

facultyRouter.get('/:employee_id', (req, res) => {
  db.each('Select * from Faculty where employee_id=?', req.params.employee_id, (err, row) => {
    res.json(row);
  })
});

export default facultyRouter;