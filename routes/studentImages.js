/*
* Handles response for the endpoint => /api/studentImages/
*/
'use strict'
/*
* Imports
*/
const db = require('../config/db')
const express = require('express');
const studentImagesRouter = express.Router();
/*
* Retrieves studentImages List.
*/
studentImagesRouter.get('/', (req, res) => {
  db.studentImages.scope('studentImages').findAll({
  })
    .then((object) => {
      if (object !== null) {
        res.send({
          result: 'success',
          studentImages: object,
        })
      }
      else {
        res.send({
          result: 'failed',
        })
      }
    })
});

// .get('/getStudentImage', (req, res) => {
//     db.faculty.scope(['studentImages']).findOne({
//       where : {id : req.query.id}
//     })
//       .then((image) => {
//         if (image !== null && image !== undefined) {
//           res.send({
//             result: 'success',
//             image
//           })
//         }
//         else {
//           res.send({
//             result: 'failed',
//           })
//         }
//       })
//   });

  module.exports = studentImagesRouter;