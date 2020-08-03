'use strict'

module.exports = (db, Sequelize) => {
  const AllotmentSnapshot = db.define('AllotmentSnapshot', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    guide: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    allotment1: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    allotment2: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    student: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    }
  }, {
      cascade: false,
    });
  return AllotmentSnapshot;
}