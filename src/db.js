import Sequelize from 'sequelize';
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

var db = new sqlite3.Database('./src/routes/db.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected");
});

export default db;