const db = require('./connection')
const Batch = require('../models/Batch')
const Settings = require('../models/Settings')

db.sync({ force: true })
  .then(() => {
    console.log('Databases and Tables Synced')
    Batch.create(({
      id: '19PW',
      code: 'PW',
      count: 40,
      tutor: "Alien",
      email: 'contact@googlegroups.com',
      year: '2019',
      color: "red",
      session: 'Odd',
      course: "MSc. Software Systems",
      active: true,
    }))
    Batch.create({
      id: '19PT',
      code: 'PT',
      count: 40,
      tutor: "Alien",
      email: 'contact@googlegroups.com',
      year: '2019',
      color: "blue",
      session: 'Odd',
      course: "MSc. Theoretical Computer Science",
      active: true,
    })
    Batch.create({
      id: '19PD',
      code: 'PD',
      count: 40,
      tutor: "Alien",
      email: 'contact@googlegroups.com',
      year: '2019',
      color: "green",
      session: 'Odd',
      course: "MSc. Data Science",
      active: true,
    })
    Batch.create({
      id: '19PA',
      code: 'PA',
      count: 40,
      tutor: "Alien",
      email: 'contact@googlegroups.com',
      year: '2019',
      color: "yellow",
      session: 'Even',
      course: "MSc. Applied Science",
      active: true,
    })
    Settings.create({
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
      faculty_sheet: 'https://docs.google.com/sheets',
      report_sheet: 'https://docs.google.com/sheets',
      examiner_sheet: 'https://docs.google.com/sheets',
    })
  })
  .catch()