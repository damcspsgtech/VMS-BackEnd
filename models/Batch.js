const Sequelize = require('sequelize')
const db = require('../config/connection');

const Batch = db.define('batch', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  code: {
    type: Sequelize.STRING,
  },
  count: {
    type: Sequelize.INTEGER,
  },
  email: {
    type: Sequelize.STRING,
  },
  year: {
    type: Sequelize.INTEGER,
  },
  tutor: {
    type: Sequelize.STRING,
  },
  color: {
    type: Sequelize.STRING,
  },
  session: {
    type: Sequelize.ENUM('Odd', 'Even')
  },
  course: {
    type: Sequelize.STRING,
  },
  active: {
    type: Sequelize.BOOLEAN,
  }
}, {
    tableName: 'Batch'
  });


module.exports = Batch;