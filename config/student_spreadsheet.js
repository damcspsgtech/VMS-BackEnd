const gs = require('google-spreadsheet');
const db = require('./db')
const credentials = require('../data/gspread_client_secret.json')

function parseSheetURL(object) {
  object = object.split('spreadsheets/d/')[1]
  return object
}
db.setting.findOne({ where: { id: 1 } })
  .then((object) => {
    let student_sheet_link = parseSheetURL(object.student_sheet)
    var doc = new gs(student_sheet_link);
    doc.useServiceAccountAuth(credentials, (err) => {
      doc.getRows(1, function (err, rows) {
        rows.forEach((row, index) => {
          let batch_id = row.rollnumber.toUpperCase().slice(0, 4);
          let object = {
            roll_no: row.rollnumber.toUpperCase(),
            semester: row.semester,
            name: row.nameaspercollegerecord.toUpperCase(),
            email: row.youremailid,
            photo: row.photo,
            phone_number: row.mobilenumber,
            project_category: row.projectcategory.toUpperCase(),
            organization_name: row.nameoftheorganization.toUpperCase(),
            postal_address: row.fullpostaladdressoftheorganization.toUpperCase(),
            address_url: row.shorturlforgooglemaplocationoftheorganization,
            mentor_name: row.nameofthementor.toUpperCase(),
            mentor_designation: row.mentorsdesignationteambuname.toUpperCase(),
            mentor_email: row.emailofthementor,
            project_domain_keywords: row.projectsdomainkeywords.toUpperCase(),
            project_title: row.tentativeprojecttitle.toUpperCase(),
            joined_date: row.joineddate,
            batch: batch_id
          }
          db.students.upsert(object);
        })
      });
    })
  })


// 