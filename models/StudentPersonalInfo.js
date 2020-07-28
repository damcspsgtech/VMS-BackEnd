'use strict'

module.exports = (db, Sequelize) => {
  const StudentPersonalInfo = db.define('StudentPersonalInfo', {
    roll_no: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    course:{
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.STRING
    },
    
  }, {
      constraints: false,
    });
  return StudentPersonalInfo;
}