/*
* Imports
*/
const Sequelize = require('sequelize');


/*
* Instantiating database connection
*/
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  dialect: "postgres",
  host: process.env.HOSTNAME,
  port: 54320
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
db.course = require('../models/Course')(sequelize, Sequelize);
db.faculty = require('../models/Faculty')(sequelize, Sequelize);
db.student = require('../models/Student')(sequelize, Sequelize);
db.setting = require('../models/Setting')(sequelize, Sequelize);
db.batch = require('../models/Batch')(sequelize, Sequelize);
db.examiner = require('../models/Examiner')(sequelize, Sequelize);
db.allotmentsnapshot = require('../models/AllotmentSnapshot')(sequelize, Sequelize);

/*
* Relations
*/
db.faculty.belongsToMany(db.student, {
  as: 'Alloted',
  through: 'Allotment',
})


db.student.belongsToMany(db.faculty, {
  as: 'Guide',
  through: 'StudentGuide',
})

db.student.belongsTo(db.batch, {
});

db.student.belongsToMany(db.examiner, {
  as: 'Examiner',
  through: 'StudentExaminer'
})

db.batch.belongsTo(db.faculty, {
  as: 'Tutor',
});

db.batch.belongsTo(db.course, {
  as: 'Course',
});

db.student.addScope('active', {
  include: [{
    model: db.batch,
    where: {
      active: true,
    }
  }, {
    model: db.faculty,
    as: 'Guide',
  }]
})

db.faculty.addScope('faculty', {
  where: {
    id: {
      [db.Sequelize.Op.not]: 'admin'
    }
  },
  order: [['id', 'ASC']],
})

db.faculty.addScope('guide', {
  where: {
    is_guide: true,
  }
})

/*
* Exports
*/
module.exports = db;