'use strict';
const {
  Model
} = require('sequelize');

module.exports = async (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this
    }
  };
  Member.init({
    id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING 
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};