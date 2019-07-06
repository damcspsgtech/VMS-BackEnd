const Sequelize = require('sequelize')
const db = require('../config/connection')

const Settings = db.define('Settings', {
  session: {
    type: Sequelize.ENUM('odd', 'even'),
  },
  count: {
    type: Sequelize.INTEGER,
  },
  student_form: {
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
  faculty_sheet: {
    type: Sequelize.STRING,
  },
  examiner_sheet: {
    type: Sequelize.STRING,
  }
}, {
    tableName: 'Settings'
  }
);
module.exports = Settings;