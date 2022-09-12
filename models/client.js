'use strict';
const {
  Model
} = require('sequelize');

module.exports = async (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
  };
  Client.init({
    id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    companyName: DataTypes.STRING,
    created: DataTypes.DATE,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    headcount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};