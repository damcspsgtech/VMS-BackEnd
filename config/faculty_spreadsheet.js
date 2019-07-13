/*
* Handles initialization of faculty model with spreadsheet data.
* 
* Will initialize batch foreign key to NULL and can be later set in the Settings.
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
  console.log(object)
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
    var document = new GoogleSpreadSheet(parseSheetURL(object.faculty_sheet));
    /*
    * Service Account Authorization using credentials.
    */
    document.useServiceAccountAuth(credentials, (err) => {
      /*
      * Gets all rows from the GoogleSpreadSheet.
      */
      document.getRows(1, (err, rows) => {
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
          /*
          * Updates or Inserts parsed row into model Faculty.
          */
          db.faculty.upsert(object);
        })
      })
    })
  })