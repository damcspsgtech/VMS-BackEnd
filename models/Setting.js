'use strict'

module.exports = (db, Sequelize) => {
  const Setting = db.define('Setting', {
    count: {
      type: Sequelize.INTEGER,
    },
    student_form: {
      type: Sequelize.STRING,
    },
    report_form: {
      type: Sequelize.STRING,
    },
    faculty_form: {
      type: Sequelize.STRING,
    },
    examiner_form: {
      type: Sequelize.STRING,
    },
    student_sheet: {
      type: Sequelize.STRING,
    },
    report_sheet: {
      type: Sequelize.STRING,
    },
    faculty_sheet: {
      type: Sequelize.STRING,
    },
    examiner_sheet: {
      type: Sequelize.STRING,
    }
  }, {
      cascade: false
    });
  return Setting;
}