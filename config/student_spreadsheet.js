/*
* Handles initialization of student model with spreadsheet data.
*
* Will not Update or Insert if Batch Settings haven't been initialized
* Will initialize guide foreign key to NULL and can be later set in the Guide List.
*/

/*
* Imports
*/
const GoogleSpreadSheet = require('google-spreadsheet');
const db = require('./db')

/*
* Secret Key for OAuth 2.0
*/
const credentials = require('../data/gspread_client_secret.json')

/*
* Parses Sheet URI into Sheet ID
*
* Required for GoogleSpreadSheet Object instantiation.
*/
function parseSheetURL(object) {
  object = object.split('spreadsheets/d/')[1]
  return object
}

/*
* Expects one row that holds the whole application's Settings whose id is 1.
*
* This row holds the required Sheet URI
*/
db.setting.findOne({ where: { id: 1 } })
  .then((object) => {
    /*
    * GoogleSpreadSheet Object, handles google-spreadsheets api calls.
    */
    var document = new GoogleSpreadSheet(parseSheetURL(object.student_sheet));
    /*
    * Service Account Authorization using credentials.
    */
    document.useServiceAccountAuth(credentials, (err) => {
      /*
      * Gets all rows from the GoogleSpreadSheet.
      */
      document.getRows(1, function (err, rows) {
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
          /*
          * Updates or Inserts parsed row into model Faculty.
          */
          db.student.upsert(object);
        })
      });
    })
  })


// 