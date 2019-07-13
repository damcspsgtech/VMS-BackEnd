const gs = require('google-spreadsheet');
const db = require('./db')
const credentials = require('../data/gspread_client_secret.json')

function parseSheetURL(object) {
  object = object.split('spreadsheets/d/')[1]
  console.log(object)
  return object
}

db.setting.findOne({ where: { id: 1 } })
  .then((object) => {
    let faculty_sheet_id = parseSheetURL(object.faculty_sheet);
    var doc = new gs(faculty_sheet_id);
    doc.useServiceAccountAuth(credentials, (err) => {
      doc.getRows(1, (err, rows) => {
        rows.forEach((row, index) => {
          let object = {
            id: row.employeeid.toUpperCase(),
            pass: row.employeeid.toUpperCase(),
            title: row.title,
            name: row.fullname.toUpperCase(),
            designation: row.designation.toUpperCase(),
            short_name: row.shortnameusedindepartment.toUpperCase(),
            core_competency: row.corecompetency.toUpperCase(),
            email: row.emailid,
            phone_number: row.phonenumber,
            areas_of_interest: row.areaofinterestforprojectguidance.toUpperCase(),
            role: 'GUEST',
            is_guide: false,
            allocated_count: 0,
          }
          db.faculty.upsert(object);
        })
      })
    })
  })