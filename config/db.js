/*
* Imports
*/
const Sequelize = require('sequelize');
//const env = require('../env');

/*
* Instantiating database connection
*/
const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  storage: './data/db.sqlite'
});

/*
* Singular DB Object.
* 
* Holds all tables, DataType and connection instance
*/
const db = {};

/*
* Connection Object
*/
db.sequelize = sequelize;

/*
* DataType Instance
*/
db.Sequelize = Sequelize;

/*
* Model Instances
*/
db.faculty = require('../models/Faculty')(sequelize, Sequelize);
db.student = require('../models/Student')(sequelize, Sequelize);
db.setting = require('../models/Setting')(sequelize, Sequelize);
db.batch = require('../models/Batch')(sequelize, Sequelize);
db.examiner = require('../models/Examiner')(sequelize, Sequelize);

/*
* Relations
*/
db.faculty.hasOne(db.student, {
  as: 'Guide',
})
db.batch.hasMany(db.student, {
  as: 'Class'
});
db.batch.hasOne(db.faculty, {
  as: 'Batch',
});
db.faculty.hasOne(db.batch, {
  as: 'Tutor',
  constraints: false,
});

/*
* Exports
*/
module.exports = db;