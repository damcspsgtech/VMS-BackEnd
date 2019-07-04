import express from 'express';
import db from '../db';
import fs from 'fs';

var jsonString = fs.readFileSync('src/backupStore/config.json', 'utf8');

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


export default settingRouter;