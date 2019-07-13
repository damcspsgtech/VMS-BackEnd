'use strict'

module.exports = (db, Sequelize) => {
  const Faculty = db.define('faculty', {
    id: {
      primaryKey: true,
      type: Sequelize.STRING,
    },
    pass: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
    is_guide: {
      type: Sequelize.BOOLEAN,
    },
    allocated_count: {
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    designation: {
      type: Sequelize.STRING,
    },
    short_name: {
      type: Sequelize.STRING,
    },
    core_competency: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    areas_of_interest: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.INTEGER,
    }
  }, {
      underscored: true
    });
  return Faculty;
}