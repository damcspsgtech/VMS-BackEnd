const express = require('express');
const db = require('../config/connection')


const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.send('No api found');
})

module.exports = indexRouter;