'use strict';

// Dependencies
var bcrypt = require('bcryptjs');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      firstname: 'Aurelien',
      lastname: 'PERRIER',
      email: 'a.perrier89@gmail.com',
      password: bcrypt.hashSync('mypassword', bcrypt.genSaltSync(10), null),
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
