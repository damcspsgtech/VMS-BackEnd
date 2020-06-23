/*
* Handles response for the endpoint => /api/faculty/
*/
'use strict'
/*
* Imports
*/
const express = require('express');
const facultyRouter = express.Router();
const repo = require('../repos');

/*
* Retrieves Faculty List.
*/
facultyRouter.get('/', (req, res) => {
  repo.facultyRepo.getNonAdminFaculties()
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
  repo.facultyRepo.getAllGuides()
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
  repo.facultyRepo.filterFaculties(req.body.search, req.body.filter_guide)
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
  Promise
    .all([
      repo.facultyRepo.updateGuide(req.body.id, req.body.is_guide), 
      repo.allotmentRepo.updateGuide(req.body.id, req.body.is_guide)
    ])
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
/*
* Exports
*/
module.exports = facultyRouter;