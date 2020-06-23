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
const drive = require('./drive')
const fs = require('fs');

StudImgPath = "G:\\osiris\\images\\";

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
return db.setting.findOne({ where: { id: 1 } })
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
      * Gets all rows from the GoogleSpreadSheet.`11
      */
			document.getRows(1, function (err, rows) {
				rows.forEach((row, index) => {
          /*
          * Updates or Inserts parsed row into model Faculty.
          */
					db.student.upsert({
						id: row.rollnumber.toUpperCase() + '_' + row.semester.toUpperCase(),
						roll_no: row.rollnumber.toUpperCase(),
						semester: row.semester.toUpperCase(),
						name: row.nameaspercollegerecord.toUpperCase(),
						email: row.youremailid,
						photo: row.photo,
						phone_number: row.mobilenumber,
						project_category: row.projectcategory.toUpperCase(),
						organization_name: row.nameoftheorganization.toUpperCase(),
						postal_address:" ",// row.fullpostaladdressoftheorganization.toUpperCase(),
						address_url: row.shorturlforgooglemaplocationoftheorganization,
						address_city: row.cityname.toUpperCase(),
						mentor_name: row.nameofthementor.toUpperCase(),
						mentor_designation: row.mentorsdesignationteambuname.toUpperCase(),
						mentor_email: row.emailofthementor,
						project_domain_keywords: row.projectsdomainkeywords.toUpperCase(),
						project_title: row.tentativeprojecttitle.toUpperCase(),
						joined_date: row.joineddate,
					}, {
							returning: true
						})
						.then(([student, created]) => {
							let fileId =  student.photo.split('https://drive.google.com/open?id=')[1];
							let filePath = "./images/"+student.roll_no;
							console.log(filePath)
							
							drive(fileId,filePath); 
							
							db.studentImages.findOne({
								where: {
									StudentId: student.roll_no
								}
							}
							)
								.then((res) => {
									
									student.setStudentImages(res)
								})
							db.batch.findOne({
								where: {
									id: student.roll_no.slice(0, 4).toUpperCase() + '_' + student.semester.toUpperCase(),
									batch_code: student.roll_no.slice(0, 4).toUpperCase(),
									semester: student.semester.toUpperCase()
								}
							}
							)
								.then((batch) => {
									student.setBatch(batch)
								})
						})
				})
			})
		})
	})


	// function getFileID(object) {
	// 	object = object.split('.')[0]
	// 	console.log(object)
	// 	return object
	//   }
	  
	//   var rec=[]
	  
	//   fs.readdir(StudImgPath, function (err, files) {
	// 	//handling error
	// 	if (err) {
	// 	  return console.log('Unable to scan directory: ' + err);
	// 	}
	// 	//listing all files using forEach
	// 	files.forEach(function (file) {
	// 		rec.push({
	// 			StudentId : getFileID(file),
	// 			image: fs.readFileSync(StudImgPath + file)
	// 	  })
		 	 
	// 	})
	// 	/*  */console.log("recordss: ",rec)
	//   db.studentImages.bulkCreate(rec)
	//   });
	  
	  