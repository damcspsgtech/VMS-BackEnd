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
      }]).then((course) => {
        db.batch.bulkCreate([
          {
            id: '15PW_VII',
            batch_code: '15PW',
            semester: 'VII',
            count: 40,
            email: 'contact@googlegroups.com',
            year: '2015',
            color: "red",
            active: true,
          }, {
            id: '15PT_VII',
            batch_code: '15PT',
            semester: 'VII',
            count: 40,
            email: 'contact@googlegroups.com',
            year: '2015',
            color: "blue",
            active: true,
          }, {
            id: '15PD_VII',
            batch_code: '15PD',
            semester: 'VII',
            count: 40,
            email: 'contact@googlegroups.com',
            year: '2015',
            color: "green",
            active: true,
          }, {
            id: '14PW_X',
            batch_code: '14PW',
            semester: 'X',
            count: 40,
            email: 'contact@googlegroups.com',
            year: '2014',
            color: "red",
            active: true,
          }, {
            id: '14PT_X',
            batch_code: '14PT',
            semester: 'X',
            count: 40,
            email: 'contact@googlegroups.com',
            year: '2014',
            color: "yellow",
            active: true,
          }
        ]).then((batches) => {
          batches[0].setCourse(course[0]);
          batches[1].setCourse(course[1]);
          batches[2].setCourse(course[2]);
          batches[3].setCourse(course[0]);
          batches[4].setCourse(course[1]);
          db.faculty.findOne({ where: { id: "admin" } })
            .then((tutor) => {
              batches[0].setTutor(tutor);
              batches[1].setTutor(tutor);
              batches[2].setTutor(tutor);
              batches[3].setTutor(tutor);
              batches[4].setTutor(tutor);
            })
        })
      })
    })

    db.setting.create({
      id: 1,
      session: 'Odd',
      count: 120,
      student_form: 'https://docs.google.com/forms',
      intern_form: 'https://docs.google.com/forms',
      faculty_form: 'https://docs.google.com/forms',
      report_form: 'https://docs.google.com/forms',
      examiner_form: 'https://docs.google.com/forms',
      student_sheet: 'https://docs.google.com/spreadsheets/d/1iRx9uwfa6CYjVEtOcta4s-4qM8cDwDo8Vre6bQyTwzw',
      intern_sheet: 'https://docs.google.com/sheets',
      faculty_sheet: 'https://docs.google.com/spreadsheets/d/1nlYqgnmxiLfkGiIEyBUZ4IlFOVTrwok4WUMBHFFl84c',
      report_sheet: 'https://docs.google.com/sheets',
      examiner_sheet: 'https://docs.google.com/sheets',
      faculty_images: '18sJfl3Jr-uBBstvjVbBt_4GBxdMb68e9',
    })

  })
  .catch()