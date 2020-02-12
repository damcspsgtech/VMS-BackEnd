const express = require('express');
const repo = require('../repos');

const studentRouter = express.Router();

studentRouter.get('/', (req, res) => {
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