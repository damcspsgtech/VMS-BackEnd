const express = require('express');
const db = require('../config/connection')
const Batch = require('../models/Batch')
const fs = require('fs');
const bodyParser = require('body-parser');

var jsonString = fs.readFileSync('./backupStore/config.json', 'utf8');

const setting = JSON.parse(jsonString);
const settingRouter = express.Router();

const SemDetails = (sem_type) => {
  var temp = { "Dept": [] };
  for (itr = 0; itr < setting.Dept.length; itr++) {
    for (i = 0; i < setting.Dept[itr]["sem"].length; i++) {
      if (setting.Dept[itr]["sem"][i] == sem_type) {
        temp.Dept.push(setting.Dept[itr])
      }
    }
  }
  return temp;
}

settingRouter.get('/', (req, res) => {
  res.send(setting)
});

settingRouter.get('/:sem_type', (req, res) => {
  res.send(SemDetails(req.params.sem_type));
});

settingRouter.post('/generic', (req, res) => {

})

settingRouter.post('/batch', (req, res) => {
  Batch.upsert({
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