const Sequelize = require('sequelize');
//const env = require('../env');

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  storage: './data/db.sqlite'
});

//Singular DB Object.
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Models
db.faculty = require('../models/Faculty')(sequelize, Sequelize);
db.students = require('../models/Students')(sequelize, Sequelize);
db.setting = require('../models/Settings')(sequelize, Sequelize);
db.batch = require('../models/Batch')(sequelize, Sequelize);

//Relations
db.batch.hasMany(db.students, {
  as: 'Student',
});
db.batch.hasOne(db.faculty, {
  as: 'Batch',
});
db.faculty.hasOne(db.batch, {
  as: 'Tutor',
  constraints: false,
});

module.exports = db;