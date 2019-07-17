const express = require('express');
const db = require('../config/db');

const studentRouter = express.Router();

studentRouter.get('/', (req, res) => {
  db.student.scope('active').findAll({
    order: [['roll_no', 'ASC']],
    include: [{
      model: db.batch,
      as: 'Batch',

    }, {
      model: db.faculty,
      as: 'Guide',
    }],
  })
    .then((student_list) => {
      if (student_list !== null) {
        res.send({
          result: 'success',
          student_list
        });
      }
      else {
        res.send({
          result: 'failure',
        })
      }
    })
})

studentRouter.get('/count', (req, res) => {
  db.student.scope('active').count()
    .then((count) => {
      if (count !== null) {
        res.send({
          result: 'success',
          count
        });
      }
      else {
        res.send({
          result: 'failure',
        })
      }
    })
})

studentRouter.post('/search', (req, res) => {
  const Op = db.Sequelize.Op;
  db.student.findAll({
    order: [['roll_no', 'ASC']],
    include: ['Guide', 'Batch'],
    where: {
      [Op.or]: [{ roll_no: { [Op.like]: '%' + req.body.search + '%' } }, { name: { [Op.like]: '%' + req.body.search + '%' } }],
    }
  }).then((students) => {
    if (students !== null) {
      res.send({
        result: 'success',
        students
      })
    }
    else {
      res.send({
        result: 'failed',
      })
    }

  })
})
module.exports = studentRouter;