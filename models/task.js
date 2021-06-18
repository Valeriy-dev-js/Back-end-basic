'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.User)
    }
  };
  Task.init({
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,        
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    // order: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   autoIncrement: true
    // }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};