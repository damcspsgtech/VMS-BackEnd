const db = require('./connection')

db.sync()
  .then(() => {
    console.log('Databases and Tables Created')
  })


