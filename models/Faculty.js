'use strict'
const bcrypt = require('bcrypt')
module.exports = (db, Sequelize) => {
  const Faculty = db.define('Faculty', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
    is_guide: {
      type: Sequelize.BOOLEAN,
    },
    allocated_count: {
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    designation: {
      type: Sequelize.STRING,
    },
    short_name: {
      type: Sequelize.STRING,
    },
    core_competency: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    areas_of_interest: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.BLOB,
      get() {
        const data = this.getDataValue('image')
        return data ? data.toString('base64') : ''
      },
      set(val) {
        this.setDataValue('image', val);
      }
    }
  }, {
    cascade: false,
    hooks: {
      beforeCreate: (faculty) => {
        const salt = bcrypt.genSaltSync();
        faculty.password = bcrypt.hashSync(faculty.password, salt);
      },
      beforeUpdate: (faculty) => {
        const salt = bcrypt.genSaltSync();
        faculty.password = bcrypt.hashSync(faculty.password, salt);
      }
    },
    instanceMethods: {
      validPassword: (password) => {
        return bcrypt.compareSync(password, this.password);
      }
    }

  });
  return Faculty;
}