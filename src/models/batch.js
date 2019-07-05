import Sequelize, { Model } from Sequelize;
export default class Batch extends Model {
  static init(sequelize, Sequelize) {
    return super.init({
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      code: Sequelize.STRING,
      count: Sequelize.INTEGER,
      email_id: Sequelize.STRING,
      year: Sequelize.INTEGER,
      tutor: Sequelize.STRING,
      color: Sequelize.STRING,
    }, {
        sequelize,
        tableName: 'Batch'
      });
  } 
}

