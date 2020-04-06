const express = require('express');
const db = require('../config/db');
const Sequelize = require('sequelize');

const studentRouter = express.Router();

studentRouter.get('/', (req, res) => {
	db.student.scope('active').findAll({
		order: [['roll_no', 'ASC']]
	})
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
	db.student.scope('active').count()
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
		group : ['address_city'],
	//	include: [{ attributes: [], model: Like }],
		attributes: ['address_city', [Sequelize.fn('count', Sequelize.col('address_city')),'student_count']]
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
		group : ['project_category'],
	//	include: [{ attributes: [], model: Like }],
		attributes: ['project_category', [Sequelize.fn('count', Sequelize.col('project_category')),'student_count']]
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
	const Op = db.Sequelize.Op;
	db.student.findAll({
		order: [['roll_no', 'ASC']],
		include: ['Guide', 'Batch'],
		where: {
			[Op.or]: [{ roll_no: { [Op.like]: '%' + req.body.search + '%' } }, { name: { [Op.like]: '%' + req.body.search + '%' } }],
		}
	}).then((students) => {
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