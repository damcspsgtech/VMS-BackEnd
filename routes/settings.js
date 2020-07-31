/*
* Handles response for the endpoint /api/settings/
*/

/*
* Imports
*/
const express = require('express');
const settingRouter = express.Router();
const repo = require('../repos');

/*
* *GET* response to GENERIC settings request.
*/
settingRouter.get('/', (req, res) => {
	/*
	* Returns the one row from Setting.
	*/
	repo.settingsRepo.getGenericSetting().then((generic) => res.send(generic))
});
/*
* *POST* response to setting generic.
*/
settingRouter.post('/', (req, res) => {
	repo.batchRepo.getAllActiveBatch()
		.then((batches) => {
			let sum = 0;
			for (batch in batches) {
				sum += batch.count;
			}
			var data = {
				count: sum,
				student_form: req.body.student_form,
				report_form: req.body.report_form,
				faculty_form: req.body.faculty_form,
				examiner_form: req.body.examiner_form,
				report_sheet: req.body.report_sheet,
				faculty_sheet: req.body.faculty_sheet,
				examiner_sheet: req.body.examiner_sheet,
				student_sheet: req.body.student_sheet,
				faculty_images: req.body.faculty_images,
			};

			repo.settingsRepo.updateGenericSettings(data)
				.then(() => res.send('Generic Settings have been updated!'))
		})
})


/*
* *GET* response to batch setting request.
*/


settingRouter.get('/batch', (req, res) => {
	repo.batchRepo.getAllBatchDetails()
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
settingRouter.get('/batch/checkBatchActive', (req, res) => {
	repo.batchRepo.checkBatchActive(req.query.id)
		.then((batch) => {
			
			if (batch) {
				res.send({
					result: 'success',
					batch_id : batch.id
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

	
	var data = {
		id: req.body.batch_id,
		count: req.body.batch_count,
		email: req.body.batch_email,
		color: req.body.batch_color,
		active: req.body.batch_active,
		batch_tutor: req.body.batch_tutorId,
	};
	repo.batchRepo.updateBatch(data)
		.then(() => {
			res.send({
				result: 'success'
			})
		})
		.catch((err) =>{ 
			
			console.log(err);
			res.send({
			
			result: 'failed'
		})});

})
settingRouter.post('/batch/add', (req, res) => {

	console.log(req.body)

	repo.courseRepo.getCourseById(req.body.course_id)
		.then((course) => {
			if (course !== null) {
				const data = {
					id: (req.body.batch_year).slice(2, 4) + req.body.course_id + '_' + req.body.batch_semester,
					batch_code: (req.body.batch_year).slice(2, 4) + req.body.course_id,
					count: 40,
					email: 'contact@googlegroups.com',
					color: 'primary',
					active: false,
					semester: req.body.batch_semester,
					year: req.body.batch_year,
					course: course,

				};
				repo.batchRepo.addBatch(data)
					.then((batch) => {
						res.send({
							result: 'success',
							batch
						})
					})
					.catch((err) =>{
						console.log(err) 
						res.send({
							result: 'failed'
						})});

			}
			else {
			
				res.send({
					result: 'course_dne'
				});
			}
		})
		.catch((err) =>{
			console.log(err) 
			res.send({
				result: 'failed'
			})});
})
settingRouter.post('/batch/delete', (req, res) => {
	console.log(req.body)
	repo.batchRepo.deleteBatch(req.body.batch_id)
		.then(() => {
			res.send({
				result: 'success',
			});
		})
		.catch((err) =>{
			console.log(err) 
			res.send({
				result: 'failed'
			})});
})
/*
* Course Routes
*/
settingRouter.get('/course', (req, res) => {
	repo.courseRepo.findAllCourse()
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
	repo.courseRepo.addCourse(
		req.body.course_id,
		req.body.course_name
	)
		.then(() => res.send({
			result: 'success'
		}))
		.catch(() => res.send({
			result: 'failed'
		}))
})
settingRouter.post('/course/delete', (req, res) => {
	repo.courseRepo.deleteCourse(req.body.course_id)
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

settingRouter.get('/batchTutor', (req, res) => {
	repo.batchRepo.getBatchTutor(req.query.id)
		.then((batch) => {
			if(batch.Tutor.id === 'admin'){
				res.send({
					result: 'admin',
				})
			}
			res.send({
				result: 'success',
				tutor: batch.Tutor
			})
		})
		.catch((error) => res.send({
			result: 'failed',
			error
		}))
})

module.exports = settingRouter;