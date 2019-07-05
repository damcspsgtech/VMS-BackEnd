import Sequelize, { Model } from 'sequelize';
export default class Faculty extends Model {
  static init(sequelize, Sequelize) {
    return super.init({
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      pass: Sequelize.STRING,
      role: Sequelize.STRING,
      is_guide: Sequelize.BOOLEAN,
      allocated_count: Sequelize.INTEGER,
      title: Sequelize.STRING,
      name: Sequelize.STRING,
      designation: Sequelize.STRING,
      short_name: Sequelize.STRING,
      core_competency: Sequelize.STRING,
      email_id: Sequelize.STRING,
      areas_of_interest: Sequelize.STRING,
      phone_number: Sequelize.INTEGER,
    }, {
        sequelize,
        tableName: 'Faculty'
      });
  }
}
