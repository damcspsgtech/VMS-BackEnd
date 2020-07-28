'use strict'

module.exports = (db, Sequelize) => {
  const Student = db.define('Student', {
    id: {
      type: Sequelize.STRING,
       primaryKey: true,
    },
    project_category: {
      type: Sequelize.STRING
    },
    organization_name: {
      type: Sequelize.STRING
    },
    addressLine1: {
      type: Sequelize.STRING(1234)
    },
    addressLine2: {
      type: Sequelize.STRING(1234)
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    zip: {
      type: Sequelize.STRING
    },
    address_url: {
      type: Sequelize.STRING(1234)
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
    project_domain: {
      type: Sequelize.STRING(1234)
    },
    project_title: {
      type: Sequelize.STRING(1234)
    },
    joined_date: {
      type: Sequelize.DATE
    }
  });
  return Student;
}