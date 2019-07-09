const Sequelize = require('sequelize')
const db = require('../config/connection')

const Students = db.define('students', {
  roll_no: {
    primaryKey: true,
    type: Sequelize.STRING
  },
  semester: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
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
  },
  mentor_designation: {
    type: Sequelize.STRING
  },
  mentor_email: {
    type: Sequelize.STRING
  },
  project_domain_keywords: {
    type: Sequelize.STRING
  },
  project_title: {
    type: Sequelize.STRING
  },
  joined_date: {
    type: Sequelize.STRING
  }
}, {
    tableName: 'Students'
  });

module.exports = Students;