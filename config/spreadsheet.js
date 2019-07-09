const gs = require('google-spreadsheet');
const Student = require('../models/Students')
const Settings = require('../models/Settings')
const credentials = require('../data/gspread_client_secret.json')

function parseSheetURL(object) {
  object = object.split('spreadsheets/d/')[1]
  return object
}
Settings.findOne({ where: { id: 1 } })
  .then((object) => {
    let student_sheet_link = parseSheetURL(object.student_sheet)
    var doc = new gs('1iRx9uwfa6CYjVEtOcta4s-4qM8cDwDo8Vre6bQyTwzw');
    doc.useServiceAccountAuth(credentials, (err) => {
      doc.getRows(1, function (err, rows) {
        rows.forEach((row, index) => {
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
          }
          Student.upsert(object);
        })
      });
    })
  })


// 