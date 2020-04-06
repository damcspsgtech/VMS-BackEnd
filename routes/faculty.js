/*
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

facultyRouter.get('/getRole', (req, res) => {
    
  db.faculty.findOne({
      where: {id : req.query.id},
      attributes: ['role'] 
    })
      .then((role) => {
        if (role !== null && role !== undefined) {
        //  console.log(role)
          res.send({
            result: 'success',
            role
          })
        }
        else {
          res.send({
            result: 'failed',
          })
        }
      })
  });

facultyRouter.get('/getProfile', (req, res) => {
    
  db.faculty.scope(['faculty']).findOne({
      where : {id : req.query.id}
    })
      .then((profile) => {
        if (profile !== null && profile !== undefined) {
        //  console.log(profile)
          res.send({
            result: 'success',
            profile
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
          },
          short_name:{
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