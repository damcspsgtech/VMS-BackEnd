/*
* Handles initialization of faculty model with spreadsheet data.
* 
* Will initialize batch foreign key to NULL and can be later set in the Settings.
*/

/*
* Imports
*/
const GoogleSpreadSheet = require('google-spreadsheet');
const db = require('./db');
const fs = require("fs");
directoryPath = "G:\\osiris\\Faculty_Images\\";

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

    /*
    * GoogleSpreadSheet Object, handles google-spreadsheets api calls.
    */
    var document = new GoogleSpreadSheet(parseSheetURL('https://docs.google.com/spreadsheets/d/1nlYqgnmxiLfkGiIEyBUZ4IlFOVTrwok4WUMBHFFl84c'));
    /*
    * Service Account Authorization using credentials.
    */
    document.useServiceAccountAuth(credentials, (err) => {
      /*
      * Gets all rows from the GoogleSpreadSheet.
      */
      document.getRows(1, (err, rows) => {
        rows.forEach((row, index) => {
          /*
          * Updates or Inserts parsed row into model Faculty.
          */

          db.faculty.create({
            id: row.employeeid.toLowerCase(),
            password: row.employeeid.toLowerCase(),
            title: row.title,
            name: row.fullname.toUpperCase(),
            designation: row.designation.toUpperCase(),
            short_name: row.shortnameusedindepartment.toLowerCase(),
            core_competency: row.corecompetency.toUpperCase(),
            email: row.emailid.toLowerCase(),
            phone_number: row.phonenumber,
            areas_of_interest: row.areaofinterestforprojectguidance.toUpperCase(),
            role: 'guest',
            image_name: row.photo.toLowerCase(),
            is_guide: false,
            allocated_count: 0,
          })
            .catch((err) => {
              if (err.name === 'SequelizeUniqueConstraintError') {
                return
              }
            })
        })
      })
    })



