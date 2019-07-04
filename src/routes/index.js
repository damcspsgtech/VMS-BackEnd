import express from 'express'
import db from '../db';
var router = express.Router();
const path = require('path');

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.send('No api found');
})

export default indexRouter;