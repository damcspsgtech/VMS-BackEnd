'use strict'

module.exports = (db, Sequelize) => {
  const Report = db.define('Report', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    reportURL: {
      type: Sequelize.STRING
    },
    
  }, {
      constraints: false,
    });
  return Report;
}