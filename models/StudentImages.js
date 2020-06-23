'use strict'

module.exports = (db, Sequelize) => {
  const StudentImages = db.define('StudentImages', {
    StudentId: {
      type: Sequelize.STRING,
       primaryKey: true,
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
  });
  return StudentImages;
}