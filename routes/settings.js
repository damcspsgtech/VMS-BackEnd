const express = require('express');
const fs = require('fs');
const db = require('../config/db');
const settingRouter = express.Router();

settingRouter.get('/', (req, res) => {
  db.setting.findOne({ where: { id: 1 } }).then((generic) => res.send(generic))
});

settingRouter.get('/batch', (req, res) => {
  db.batch.findAll({ where: { active: true } })
    .then((batches) => {
      res.send(batches);
    });
});

settingRouter.post('/', (req, res) => {
  db.batch.findAll({ where: { active: true } })
    .then((batches) => {
      let sum = 0;
      for (let i = 0; i < batches.length; i++) {
        sum += batches[i].count;
      }
      db.setting.upsert({
        id: '1',
        count: sum,
        session: req.body.session,
        student_form: req.body.student_form,
        report_form: req.body.report_form,
        faculty_form: req.body.faculty_form,
        examiner_form: req.body.examiner_form,
        report_sheet: req.body.report_sheet,
        faculty_sheet: req.body.faculty_sheet,
        examiner_sheet: req.body.examiner_sheet,
        student_sheet: req.body.student_sheet,
      })
        .then(() => res.send('Generic Settings have been updated!'))
    })
})

settingRouter.post('/batch', (req, res) => {
  db.batch.upsert({
    id: req.body.batch_id,
    code: req.body.batch_code,
    count: req.body.batch_count,
    email: req.body.batch_email,
    year: req.body.batch_year,
    tutor: req.body.batch_tutor,
    color: req.body.batch_color
  })
    .then(() => res.send('Batch Settings Updated Successfuly'))
    .catch((error) => res.send('Batch Setting Update Failed' + error));
})
module.exports = settingRouter;