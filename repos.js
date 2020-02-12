const express = require('express');
const db = require('./config/db');

const Op = db.Sequelize.Op;

class StudentRepo {
    getActiveStudents() {
        return db.student.scope('active').findAll({
            order: [['roll_no', 'ASC']]
        })
    }

    getStudentCount() {
        return db.student.scope('active').count()
    }

    filterStudents(searchString) {
        return db.student.findAll({
            order: [['roll_no', 'ASC']],
            include: ['Guide', 'Batch'],
            where: {
                [Op.or]: [{ roll_no: { [Op.like]: '%' + req.body.search + '%' } },
                { name: { [Op.like]: '%' + req.body.search + '%' } }],
            }
        })
    }

}

class FacultyRepo {
    getFacultyById(username) {
        return db.faculty.findOne({
            where: {
                id: username
            }
        })
    }

    getAllGuides() {
        return db.faculty.scope(['faculty', 'guide']).findAll({})
    }

    getNonAdminFaculties() {
        return db.faculty.scope('faculty').findAll({})
    }

    filterFaculties(searchString, filter_guide) {
        return db.faculty.scope('faculty').findAll({
            where: {
                [db.Sequelize.Op.and]: {
                    is_guide: {
                        [db.Sequelize.Op.in]: [true, (filter_guide === true ? true : false)]
                    },
                    [db.Sequelize.Op.or]: {
                        name: {
                            [db.Sequelize.Op.like]: '%' + searchString + '%',
                        },
                        id: {
                            [db.Sequelize.Op.like]: '%' + searchString + '%',
                        }
                    }
                }
            }
        })
    }

    updateGuide(id, is_guide) {
        return db.faculty.findOne({
            where: {
                id: id,
            }
        })
            .then((faculty) => {
                faculty.update({
                    is_guide: is_guide,
                })
            })
    }
}

class BatchRepo {
    getAllBatchDetails() {
        return db.batch.findAll({
            order: [['id', 'DESC']],
            include: ['Tutor', 'Course'],
        })
    }

    getAllActiveBatch() {
        return db.batch.findAll({ where: { active: true } })
    }

    deleteBatch(id) {
        return db.batch.destroy({ where: { id: id } })
    }

    setTutor(batch, batch_tutor) {
        return batch.setTutor(batch_tutor);
    }

    updateBatch(data) {
        db.batch.upsert({
            id: data.batch_id,
            count: data.batch_count,
            email: data.batch_email,
            color: data.batch_color,
            active: data.batch_active,
        }, {
            returning: true
        })
            .then(([batch, created]) => {
                return batch.setTutor(data.batch_tutor);
            })
    }

    addBatch(data) {
        db.batch.upsert({
            id: data.id,
            batch_code: data.batch_code,
            count: data.count,
            email: data.email,
            color: data.color,
            active: data.active,
            semester: data.batch_semester,
            year: data.batch_year,
        }, {
            returning: true,
        })
            .then(([batch, created]) => {
                batch.setCourse(data.course);
                db.faculty.findOne({ where: { id: 'admin' } })
                    .then((tutor) => {
                        return batch.setTutor(tutor)
                    })
            })
    }

}

class SettingsRepo {
    getGenericSetting() {
        return db.setting.findOne({ where: { id: 1 } })
    }

    updateGenericSettings(data) {
        return db.setting.upsert({
            id: '1',
            count: count,
            student_form: data.student_form,
            report_form: data.report_form,
            faculty_form: data.faculty_form,
            examiner_form: data.examiner_form,
            report_sheet: data.report_sheet,
            faculty_sheet: data.faculty_sheet,
            examiner_sheet: data.examiner_sheet,
            student_sheet: data.student_sheet,
        })
    }
}

class CourseRepo {
    getCourseById(course_id) {
        return db.course.findOne({ where: { course_id } })
    }
    findAllCourse() {
        return db.course.findAll({ order: [['id', 'ASC']] })
    }

    addCourse(course_id, course_name) {
        return db.course.upsert({
            id: course_id,
            name: course_name,
        })
    }

    deleteCourse(course_id) {
        return db.course.destroy({ where: { id: course_id } })
    }
}

const studentRepo = new StudentRepo();
const facultyRepo = new FacultyRepo();
const batchRepo = new BatchRepo();
const settingsRepo = new SettingsRepo();
const courseRepo = new CourseRepo();

module.exports = {
    studentRepo: studentRepo,
    facultyRepo: facultyRepo,
    batchRepo: batchRepo,
    settingsRepo: settingsRepo,
    courseRepo: courseRepo
}