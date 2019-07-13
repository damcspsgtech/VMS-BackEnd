const db = require('./db')

db.sync()
  .then(() => {
    console.log('Databases and Tables Synced')
  })
  .catch()


