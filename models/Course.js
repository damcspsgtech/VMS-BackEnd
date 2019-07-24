'use strict'

module.exports = (db, Sequelize) => {
  const Course = db.define('Course', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    }
  })
  return Course;
}