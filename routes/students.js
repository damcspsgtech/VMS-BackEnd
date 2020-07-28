const express = require('express');
const repo = require('../repos');
const db = require('../config/db');
const Sequelize = require('sequelize');

const studentRouter = express.Router();

studentRouter.get('/', (req, res) => {
	if(!req.query.id){
	repo.studentRepo.getActiveStudents()
		.then((student_list) => {
			if (student_list !== null) {

				res.send({
					result: 'success',

					student_list
				});
			}
			else {
				res.send({
					result: 'failure',
				})
			}
		})
	}
	else{
		repo.studentRepo.getActiveStudentsByBatch(req.query.id)
		.then((student_list) => {
			if (student_list !== null) {

				res.send({
					result: 'success',

					student_list
				});
			}
			else {
				res.send({
					result: 'failure',
				})
			}
		})
	}
})
studentRouter.post('/addStudentPersonalInfo', (req, res) => {

	repo.studentRepo.addStudentPersonalInfo(req.body)
		.then(() => {
			res.send({
				result: 'success'
			})
		})
		.catch((err) => {

			console.log(err);
			res.send({

				result: 'failed'
			})
		});

})

studentRouter.post('/updateStudentPersonalInfo', (req, res) => {

	repo.studentRepo.updateStudentPersonalInfo(req.body)
		.then(() => {
			res.send({
				result: 'success'
			})
		})
		.catch((err) => {

			console.log(err);
			res.send({

				result: 'failed'
			})
		});

})

studentRouter.get('/getprojectDetails',(req, res) => {

	repo.studentRepo.findStudent(req.query.id)
		.then((studentInfo) => {
			console.log(studentInfo)
			if (studentInfo !== null) {
				res.send({
					result: 'success',
					studentInfo
				});
			}
			else {
				res.send({
					result: 'failed',
				})
			}
		})

})

studentRouter.post('/addProjectDetails', (req, res) => {
	console.log(req.body)
	repo.studentRepo.addStudentProjectInfo(req.body)
		.then(() => {
			res.send({
				result: 'success'
			})
		})
		.catch((err) => {
			console.log(err);
			res.send({
				result: 'failed'
			})
		});

})

studentRouter.get('/getStudentPersonalInfo',(req,res) =>{
	repo.studentRepo.getStudentPersonalInfo(req.query.id)
		.then((studentInfo) => {
			if (studentInfo !== null) {
				res.send({
					result: 'success',
					studentInfo
				});
			}
			else{
				res.send({
					result: 'failed',
				});
			}
		})
})

studentRouter.post('/studentlogin', (req, res) => {
	repo.studentRepo.getStudentPersonalInfo(req.body.roll_no)
		.then((studentInfo) => {
			if (studentInfo !== null) {
				res.send({
					result: 'success',
				});
			}
			else {

				repo.studentRepo.addStudentPersonalInfo(req.body)
					.then(() => {
						res.send({
							result: 'success'
						})
					})
					.catch((err) => {

						console.log(err);
						res.send({

							result: 'failed'
						})
					});

			}
		})

})
studentRouter.post('/uploadPhoto', (req, res) => {

	repo.studentRepo.uploadPhoto(req.body)
		.then((studentInfo) => {
			res.send({
				result: 'success',
				imageURL: studentInfo.image
			})
		})
		.catch((err) => {
			console.log(err);
			res.send({
				result: 'failed'
			})
		});

})

studentRouter.get('/count', (req, res) => {
	repo.studentRepo.getStudentCount()
		.then((count) => {
			if (count !== null) {
				res.send({
					result: 'success',
					count
				});
			}
			else {
				res.send({
					result: 'failure',
				})
			}
		})
})

studentRouter.get('/studentVScity', (req, res) => {
	//console.log(" **** ")
	db.student.findAll({
		group: ['address_city'],
		//	include: [{ attributes: [], model: Like }],
		attributes: ['address_city', [Sequelize.fn('count', Sequelize.col('address_city')), 'student_count']]
	}).then((studentVScity) => {

		//	console.log(studentVScity)		
		if (studentVScity !== null) {
			res.send({
				result: 'success',
				studentVScity
			})
		}
		else {
			//console.log("student empty")
			res.send({
				result: 'failed',
			})
		}

	})
})

studentRouter.get('/industryVSinstitute', (req, res) => {
	db.student.findAll({
		group: ['project_category'],
		//	include: [{ attributes: [], model: Like }],
		attributes: ['project_category', [Sequelize.fn('count', Sequelize.col('project_category')), 'student_count']]
	}).then((industryVSinstitute) => {

		//	console.log(industryVSinstuite)		
		if (industryVSinstitute !== null) {
			res.send({
				result: 'success',
				industryVSinstitute
			})
		}
		else {
			res.send({
				result: 'failed',
			})
		}

	})
})

studentRouter.post('/search', (req, res) => {
	repo.studentRepo.filterStudentsUsingNameOrRollNumber(req.body.search)
		.then((students) => {
			if (students !== null) {
				res.send({
					result: 'success',
					students
				})
			}
			else {
				res.send({
					result: 'failed',
				})
			}

		})
})
module.exports = studentRouter;