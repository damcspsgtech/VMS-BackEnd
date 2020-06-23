/*
* Handles response for the endpoint => /api/allotment/
*/
'use strict'
/*
* Imports
*/
const express = require('express');
const allotmentRouter = express.Router();
const service = require('../services');
const repo = require('../repos');


allotmentRouter.get('/', (req, res) => {
  Promise
    .all([
      service.getDetails(),
      repo.allotmentRepo.getAllotmentSnapshot(),
      service.getAllotmentDetails()
    ])
    .then(data => {
      const [details, snapshot, allotment] = data
      res.send({
        result: 'success',
        allotment: snapshot[0].dataValues,
        guides: details['guide'],
        student: details['student'],
        allot: allotment
      })

    })
    .catch((err) => {
      res.send({
        result: 'failure',
      })
    })
})

allotmentRouter.post('/updateAllotment', (req, res) => {
  repo.allotmentRepo.updateAllotment(
    req.body.allotment.id, 
    req.body.allotment.students_alloted
  ).then(data => {
      res.send({
        result: "success"
      })
    })
})

allotmentRouter.post('/updateSnapshot', (req, res) => {
  repo.allotmentRepo.updateSnapshot(
    req.body.snapshot
  ).then(data => {
      res.send({
        result: "success"
      })
    })
})
    

/*
* Exports
*/
module.exports = allotmentRouter;