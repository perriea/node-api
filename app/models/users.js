'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstname: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};