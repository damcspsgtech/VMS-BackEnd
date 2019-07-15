'use strict'

module.exports = (db, Sequelize) => {
  const Batch = db.define('batch', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    semester: {
      type: Sequelize.STRING,
    },
    count: {
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.STRING,
    },
    color: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.BOOLEAN,
    }
  }, {
      underscored: true,
      cascade: false
    });
  return Batch;
}