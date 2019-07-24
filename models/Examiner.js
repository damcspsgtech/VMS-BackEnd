'use strict'

module.exports = (db, Sequelize) => {
  const Examiner = db.define('Examiner', {
    title: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    designation: {
      type: Sequelize.STRING,
    },
    organization_address: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
    locality: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.INTEGER,
    },
    field_of_expertise: {
      type: Sequelize.STRING,
    }
  }, {
      cascade: false,
    });
  return Examiner;
}