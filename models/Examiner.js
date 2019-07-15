'use strict'

module.exports = (db, Sequelize) => {
  const Examiner = db.define('examiner', {

  }, {
      underscored: true,
      cascade: false,
    });
  return Examiner;
}