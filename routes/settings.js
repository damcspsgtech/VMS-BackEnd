/*
* Handles response for the endpoint /api/settings/
*/

/*
* Imports
*/
const express = require('express');
const db = require('../config/db');
const settingRouter = express.Router();

/*
* *GET* response to GENERIC settings request.
*/
settingRouter.get('/', (req, res) => {
  /*
  * Returns the one row from Setting.
  */
	db.setting.findOne({ where: { id: 1 } }).then((generic) => res.send(generic))
});
/*
* *POST* response to setting generic.
*/
settingRouter.post('/', (req, res) => {
	db.batch.findAll({ where: { active: true } })
		.then((batches) => {
			let sum = 0;
			for (batch in batches) {
				sum += batch.count;
			}
			db.setting.upsert({
				id: '1',
				count: sum,
				student_form: req.body.student_form,
				report_form: req.body.report_form,
				faculty_form: req.body.faculty_form,
				examiner_form: req.body.examiner_form,
				report_sheet: req.body.report_sheet,
				faculty_sheet: req.body.faculty_sheet,
				examiner_sheet: req.body.examiner_sheet,
				student_sheet: req.body.student_sheet,
			})
				.then(() => res.send('Generic Settings have been updated!'))
		})
})


/*
* *GET* response to batch setting request.
*/
settingRouter.get('/batch', (req, res) => {
	db.batch.findAll({
		order: [['id', 'DESC']],
		include: ['Tutor', 'Course'],
	})
		.then((batches) => {
			if (batches !== null) {
				res.send({
					result: 'success',
					batches
				})
			}
			else {
				res.send({
					result: 'failed'
				})
			}

		});
});
settingRouter.post('/batch/update', (req, res) => {
	db.batch.upsert({
		id: req.body.batch_id,
		count: req.body.batch_count,
		email: req.body.batch_email,
		color: req.body.batch_color,
		active: req.body.batch_active,
	})
		.then(() => {
			db.batch.findOne({
				where: {
					id: req.body.batch_id,
					semester: req.body.batch_semester,
				}
			})
				.then((batch) => {
					batch.setTutor(req.body.batch_tutor);
					res.send({
						result: 'success'
					})
				})
		})
		.catch(() => res.send({
			result: 'failed'
		}));
})
settingRouter.post('/batch/add', (req, res) => {
	db.course.findOne({ where: { id: req.body.course_id } })
		.then((course) => {
			if (course !== null) {
				db.batch.findOne({
					where: {
						id: (req.body.batch_year).slice(2, 4) + req.body.course_id,
						semester: req.body.batch_semester,
					}
				})
					.then((batch) => {
						if (batch === null) {
							db.batch.create({
								id: (req.body.batch_year).slice(2, 4) + req.body.course_id,
								count: 40,
								email: 'contact@googlegroups.com',
								color: 'primary',
								active: false,
								semester: req.body.batch_semester,
								year: req.body.batch_year,
							})
								.then((batch) => {
									batch.setCourse(course);
									db.faculty.findOne({ where: { id: 'admin' } })
										.then((tutor) => {
											batch.setTutor(tutor)
										}).then(() => res.send({
											result: 'success'
										}))

								})
						}
						else {
							res.send({
								result: 'batch_exists'
							});
						}
					})

			}
			else {
				res.send({
					result: 'course_dne'
				});
			}
		})
		.catch(() => res.send({
			result: 'failed'
		}));
})
settingRouter.post('/batch/delete', (req, res) => {
	db.batch.destroy({ where: { id: req.body.batch_id } })
		.then(() => {
			res.send({
				result: 'success',
			});
		})
})
/*
* Course Routes
*/
settingRouter.get('/course', (req, res) => {
	db.course.findAll({ order: [['id', 'ASC']] })
		.then((courses) => {
			if (courses === null) {
				res.send({
					result: 'course_dne',
				})
			}
			else {
				res.send({
					result: 'success',
					courses,
				})
			}
		})
		.catch((error) => res.send({
			result: 'failed',
			error
		}))
})
settingRouter.post('/course/add', (req, res) => {
	db.course.upsert({
		id: req.body.course_id,
		name: req.body.course_name,
	})
		.then(() => res.send({
			result: 'success'
		}))
		.catch(() => res.send({
			result: 'failed'
		}))
})
settingRouter.post('/course/delete', (req, res) => {
	db.course.destroy({ where: { id: req.body.course_id } })
		.then((rows) => {
			if (rows > 0) {
				res.send({
					result: 'success'
				})
			}
			else {
				res.send({
					result: 'failed'
				})
			}
		})
})
module.exports = settingRouter;