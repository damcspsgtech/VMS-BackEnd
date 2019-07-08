const db = require('./connection')

db.sync({ force: true })
  .then(() => {
    console.log('Databases and Tables Synced')
  })
  .catch()


