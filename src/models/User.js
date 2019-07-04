import Sequelize, { Model } from Sequelize;

export default class User extends Model { }

User.init({
  name: {
    type: Sequelize.STRING,
  },
  pass: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.STRING,
  }
}, {
    sequelize,
    modelName: 'user',
  });