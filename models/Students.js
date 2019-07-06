const Sequelize = require('sequelize')
const db = require('../config/connection')

const Students = db.define('students', {
  roll_no: {
    type: Sequelize.STRING
  },
  semester: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  email_id: {
    type: Sequelize.STRING
  },
  photo: {
    type: Sequelize.STRING
  },
  phone_number: {
    type: Sequelize.INTEGER
  },
  project_category: {
    type: Sequelize.STRING
  },
  organization_name: {
    type: Sequelize.STRING
  },
  postal_address: {
    type: Sequelize.STRING
  },
  address_url: {
    type: Sequelize.STRING
  },
  address_city: {
    type: Sequelize.STRING
  },
  mentor_name: {
    type: Sequelize.STRING
  }
}, {
    tableName: 'Students'
  });

module.exports = Students;