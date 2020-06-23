const express = require('express');
const repo = require('./repos');

class AllotmentServices{
    getDetails(){
        return Promise
            .all([
                repo.facultyRepo.getAllGuides(), 
                repo.studentRepo.getActiveStudents()
            ])
            .then(data => {
                const [guides, students] = data
                const result = {};
                const guideDict = {};
                const studentDict = {};
                guides.forEach(element => {
                    const id = element.dataValues.id;
                    guideDict[id] = element.dataValues;
                });
                
                students.forEach(element => {
                    const id = element.dataValues.id;
                    studentDict[id] = element.dataValues;
                })
                result['student'] = studentDict;
                result['guide'] = guideDict;

                return result;
            })
    }

    getAllotmentDetails(){
        return repo.facultyRepo.getAllGuidesWithAllotment().then(guides => {
            var allot = {};
            guides.forEach(guide => {
                const studentIds = [];
                const students = guide.dataValues.Alloted
                students.forEach(element => {
                    studentIds.push(element.dataValues.id)
                })
                allot[guide.dataValues.id] = {
                    id: guide.dataValues.id,
                    name: guide.dataValues.name,
                    students_alloted: studentIds
                }
                
            });
            return allot;
            
        })
         
    }

    
}




const allotService = new AllotmentServices();
module.exports = allotService;