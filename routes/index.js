const express = require('express');
const db = require('../config/connection');


const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.send('No api found');
})

indexRouter.get('/:id',(req,res)=>{
  req.session.u_id = req.params.id;
  if(req.session.u_id == 1 ){
    console.log('Session:',req.session.u_id);
    res.send('Hello');
  }
  else{
    console.log(req.params.id,req.session.u_id);
    res.send('Sessuon has been set');
  }
})

module.exports = indexRouter;