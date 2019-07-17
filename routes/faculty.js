2/*
* Handles response for the endpoint => /api/faculty/
*/
'use strict'
/*
* Imports
*/
const db = require('../config/db')
const express = require('express');
const facultyRouter = express.Router();
/*
* Retrieves Faculty List.
*/
facultyRouter.get('/', (req, res) => {
  db.faculty.scope('faculty').findAll({
  })
    .then((object) => {
      if (object !== null) {
        res.send({
          result: 'success',
          faculty: object,
        })
      }
      else {
        res.send({
          result: 'failed',
        })
      }
    })
});
facultyRouter.get('/guide', (req, res) => {
  db.faculty.scope(['faculty', 'guide']).findAll({
  })
    .then((guides) => {
      if (guides !== null && guides !== undefined) {
        res.send({
          result: 'success',
          guides,
        })
      }
      else {
        res.send({
          result: 'failed',
        })
      }
    })
});

facultyRouter.post('/search', (req, res) => {
  db.faculty.scope('faculty').findAll({
    where: {
      [db.Sequelize.Op.and]: {
        is_guide: {
          [db.Sequelize.Op.in]: [true, (req.body.filter_guide === true ? true : false)]
        },
        [db.Sequelize.Op.or]: {
          name: {
            [db.Sequelize.Op.like]: '%' + req.body.search + '%',
          },
          id: {
            [db.Sequelize.Op.like]: '%' + req.body.search + '%',
          }
        }
      }
    }
  })
    .then((faculty) => {
      if (faculty !== null) {
        res.send({
          result: 'success',
          faculty,
        })
      }
    })
})

facultyRouter.post('/update', (req, res) => {
  db.faculty.findOne({
    where: {
      id: req.body.id,
    }
  })
    .then((faculty) => {
      faculty.update({
        is_guide: req.body.is_guide,
      })
        .then(() => {
          res.send({
            result: 'success'
          })
        })
        .catch((error) => {
          res.send({
            result: 'failed',
            error,
          })
        })
    })
})

/*
* Exports
*/
module.exports = facultyRouter;