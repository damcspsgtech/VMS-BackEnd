const express = require('express');
const db = require('./config/db');
const bcrypt = require('bcrypt')

const Op = db.Sequelize.Op;

class StudentRepo {


    addStudentProjectInfo(data) {


        return db.student.upsert({

            id: data.id.toUpperCase(),
            project_category: data.projectInfo.project_category.toUpperCase(),
            organization_name: data.projectInfo.organization_name.toUpperCase(),
            addressLine1: data.projectInfo.addressLine1.toUpperCase(),
            addressLine2: data.projectInfo.addressLine2.toUpperCase(),
            city: data.projectInfo.city.toUpperCase(),
            state: data.projectInfo.state.toUpperCase(),
            country: data.projectInfo.country.toUpperCase(),
            zip: data.projectInfo.zip,
            address_url: data.projectInfo.address_url.toUpperCase(),
            mentor_name: data.projectInfo.mentor_name.toUpperCase(),
            mentor_designation: data.projectInfo.mentor_designation.toUpperCase(),
            mentor_email: data.projectInfo.mentor_email,
            project_domain: data.projectInfo.project_domain.toUpperCase(),
            project_title: data.projectInfo.project_title.toUpperCase(),
            joined_date: data.projectInfo.joined_date,

        }, {
            returning: true
        })
            .then(([student, created]) => {

                db.StudentPersonalInfo.findOne({
                    where: {
                        roll_no: data.roll_no.toUpperCase()
                    }
                }).then((studentInfo) => {
                    student.setStudentPersonalInfo(studentInfo)
                })

                db.batch.findOne({
                    where: {
                        id: data.batch_id,
                    }
                }
                )
                    .then((batch) => {
                        student.setBatch(batch)
                    })
            })

    }

    addStudentPersonalInfo(data) {

        return db.StudentPersonalInfo.upsert({
            roll_no: data.roll_no.toUpperCase(),
            course: data.course.toUpperCase(),
            name: data.name.toUpperCase(),
            email: data.email,
            phone_number: data.phone_number,
            image: ''
        })
    }

    updateStudentPersonalInfo(data) {

        return db.StudentPersonalInfo.upsert({
            roll_no: data.roll_no.toUpperCase(),
            email: data.email,
            phone_number: data.phone_number,
        })
    }

    uploadPhoto(data) {
        return db.StudentPersonalInfo.upsert({
            roll_no: data.roll_no.toUpperCase(),
            image: data.url
        })
    }

    updateProjectDetails(data) {
        console.log(data)
        return db.student.upsert({
            id: data.id.toUpperCase(),
            project_category: data.project_category.toUpperCase(),
            organization_name: data.organization_name.toUpperCase(),
            addressLine1: data.addressLine1.toUpperCase(),
            addressLine2: data.addressLine2.toUpperCase(),
            city: data.city.toUpperCase(),
            state: data.state.toUpperCase(),
            country: data.country.toUpperCase(),
            zip: data.zip,
            address_url: data.address_url.toUpperCase(),
            mentor_name: data.mentor_name.toUpperCase(),
            mentor_designation: data.mentor_designation.toUpperCase(),
            mentor_email: data.mentor_email,
            project_domain: data.project_domain.toUpperCase(),
            project_title: data.project_title.toUpperCase(),
            joined_date: data.joined_date,

        })
    }

    getIndustryVsInstituteInfo() {
        return db.student.scope('active').findAll({
            group: ['project_category'],
            attributes: ['project_category', [Sequelize.fn('count', Sequelize.col('project_category')), 'student_count']]
        })
    }

    findStudent(roll) {
        return db.student.scope('active').findOne({
            where: {
                id: roll.toUpperCase()
            }
        })
    }

    getStudentPersonalInfo(roll) {
        return db.StudentPersonalInfo.findOne({
            where: {
                roll_no: roll.toUpperCase()
            }
        })


    }

    getActiveStudents() {
        return db.student.scope('active').findAll({
            order: [['StudentPersonalInfoRollNo', 'ASC']]
        })
    }

    getCityDistribution() {
        return db.student.scope('active').findAll({
            group: ['city'],
            attributes: ['address_city', [Sequelize.fn('count', Sequelize.col('address_city')), 'student_count']]
        })
    }

    getActiveStudentsByBatch(batch) {
        return db.student.scope('active').findAll({
            where: { BatchId: batch },
            order: [['StudentPersonalInfoRollNo', 'ASC']]
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

    getAllActiveStudentIds() {
        return db.student.scope('active').findAll({
            order: [['StudentPersonalInfoRollNo', 'ASC']],
            attributes: ['id']
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



    getAllGuidesIds() {
        return db.faculty.scope(['faculty', 'guide']).findAll({
            attributes: ['id']
        })
    }

    getNonAdminFaculties() {
        return db.faculty.scope('faculty').findAll({})
    }

    filterFaculties(searchString, filter_guide, filter_notguide) {
        return db.faculty.scope('faculty').findAll({
            where: {
                [db.Sequelize.Op.and]: {

                    is_guide: {
                        [db.Sequelize.Op.in]: [filter_guide, !filter_notguide]
                    },
                    [db.Sequelize.Op.or]: {
                        name: {
                            [db.Sequelize.Op.like]: '%' + searchString.toUpperCase() + '%',
                        },
                        id: {
                            [db.Sequelize
                                .Op.like]: '%' + searchString.toLowerCase() + '%',
                        },
                        short_name: {
                            [db.Sequelize.Op.like]: '%' + searchString.toLowerCase() + '%',
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


    updatePassword(id, pwd) {
        return db.faculty.findOne({
            where: {
                id: id,
            }
        })
            .then((faculty) => {
                const salt = bcrypt.genSaltSync();
                pwd = bcrypt.hashSync(pwd, salt);
                faculty.update({
                    password: pwd,
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

    getBatchTutor(batchId) {
        return db.batch.scope('tutor').findOne({
            where: { id: batchId }
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

        return db.batch.upsert({
            id: data.id,
            count: data.count,
            email: data.email,
            color: data.color,
            active: data.active,
        }, {
            returning: true
        }).then(([batch]) => {

            return batch.setTutor(data.batch_tutor);
        })
    }

    checkBatchActive(batchCode) {
        return db.batch.findOne({
            where: {
                batch_code: batchCode,
                active: true,
            }
        })
    }

    findActiveTutor(tutor) {
        return db.batch.scope('tutor').findOne({
            where: {
                TutorId: tutor,
                active: true,
            }
        })
    }

    addBatch(data) {
        return db.batch.upsert({
            id: data.id,
            batch_code: data.batch_code,
            count: data.count,
            email: data.email,
            color: data.color,
            active: data.active,
            semester: data.semester,
            year: data.Syear,
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
            faculty_images: data.faculty_images
        })
    }
}

class CourseRepo {
    getCourseById(course_id) {
        return db.course.findOne({ where: { id: course_id } })
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
    courseRepo: courseRepo,

}