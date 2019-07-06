const express = require('express');
const db = require('../config/connection')

var router = express.Router();
const path = require('path');

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.send('No api found');
})

module.exports = indexRouter;