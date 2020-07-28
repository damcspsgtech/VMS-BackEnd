/*
* Drops all tables and recreates the database
*/
'use strict'
/*
* Imports
*/
const db = require('./db')

/*
* All tables are dropped.
*/
//db.sequelize.drop();
/*
* database is synced.
*/
db.sequelize.sync({ force: true })
  .then(() => {
    console.log('Databases and Tables Synced')
    /*
    * Redundant Creates.
    *
    * Only for development. Will be removed as an when we phase to production.
    */
    db.faculty.create({
      id: 'admin',
      password: 'admin',
      role: 'admin',
      name: 'Administrator'

    }).then(() => {
      db.course.bulkCreate([{
        id: 'PW',
        name: 'MSc. Software Systems',
      }, {
        id: 'PT',
        name: 'MSc. Theoretical Computer Science',
      }, {
        id: 'PD',
        name: 'MSc. Data Science',
      }, {
        id: 'PA',
        name: 'MSc. Applied Mathematics',
      }])
                 
      })
    })

  .catch()