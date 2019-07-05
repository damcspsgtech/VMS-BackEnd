import { Model } from 'sequelize';

export default class Settings extends Model {
  static init(sequelize, Sequelize) {
    return super.init({
      session: Sequelize.ENUM('odd', 'even'),
      count: Sequelize.INTEGER,
      student_form: Sequelize.STRING,
      faculty_form: Sequelize.STRING,
      examiner_form: Sequelize.STRING,
      student_sheet: Sequelize.STRING,
      faculty_sheet: Sequelize.STRING,
      examiner_sheet: Sequelize.STRING,
    }, {
        sequelize,
        tableName: 'Settings'
      }
    )
  }
}

Settings.init();