const Sequelize = require('sequelize');

sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  storage: './data/db.sqlite'
});

module.exports = sequelize;