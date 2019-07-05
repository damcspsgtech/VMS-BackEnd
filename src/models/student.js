import Sequelize, { Model } from Sequelize;

export default class Students extends Model { }

Students.init({
  roll_no: {

  },
  semester: {

  },
  name: {

  },
  email_id: {

  },
  photo: {

  },
  phone_number: {

  },
  project_category: {

  },
  organization_name: {

  },
  postal_address: {

  },
  address_url: {

  },
  address_city: {

  },
  mentor_name: {

  }
}, {
    sequelize,
    tableName: 'Students'
  });