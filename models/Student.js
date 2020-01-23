'use strict'

module.exports = (db, Sequelize) => {
  const Student = db.define('Student', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    roll_no: {
      type: Sequelize.STRING,
    },
    semester: {
      type: Sequelize.STRING
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
      type: Sequelize.STRING
    },
    project_category: {
      type: Sequelize.STRING
    },
    organization_name: {
      type: Sequelize.STRING
    },
    postal_address: {
      type: Sequelize.STRING(1234)
    },
    address_url: {
      type: Sequelize.STRING(1234)
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
      type: Sequelize.STRING(1234)
    },
    project_title: {
      type: Sequelize.STRING(1234)
    },
    joined_date: {
      type: Sequelize.STRING
    }
  }, {
      constraints: false,
    });
  return Student;
}