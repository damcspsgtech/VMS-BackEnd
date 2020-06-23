/*
* Syncing database with spreadsheet.
*/
'use strict'

/*
* Imports that handle sheet Synchronization
*/
const students = require('./student_spreadsheet');
const faculty = require('./faculty_spreadsheet');
const repo = require('../repos');
const db = require('./db')
// const facultyImages =  require('./drive');


Promise.all([students, faculty]).then(() => {
    Promise.all([repo.facultyRepo.getAllGuidesIds(), repo.studentRepo.getAllActiveStudentIds()])
    .then((data) => {
        const [guide, student] = data;
        var guideIds = [], studentIds = [];
        guide.forEach(element => {
            guideIds.push(element.dataValues.id)
        });
        student.forEach(element => {
            studentIds.push(element.dataValues.id)
        })
        
        db.allotmentsnapshot.upsert({
            id: 1,
            guide: guideIds,
            student: studentIds,
            allotment1: [],
            allotment2: []
        })
        
    })

})


