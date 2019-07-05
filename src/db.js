import Sequelize from 'sequelize';
import FacultyModel from './models/faculty';
//import StudentsModel from 'models/students';
import SettingsModel from './models/settings';
import BatchModel from './models/batch';

const sqlite3 = require('sqlite3');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Faculty = FacultyModel(sequelize, Sequelize);
const Settings = SettingsModel(sequelize, Sequelize);
const Batch = BatchModel(sequelize, Sequelize);


sequelize.sync({ force: true })
  .then(() => {
    console.log('Databases and Tables Created')
  })

export { Faculty, Settings, Batch }
/*
var db = new sqlite3.Database('./src/routes/db.sqlite', (err) => {
if (err) {
  return console.error(err.message);
}
console.log("Connected");
}); */
