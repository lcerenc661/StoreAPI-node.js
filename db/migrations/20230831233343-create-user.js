'use strict';

const { UserSchema, USER_TABLE } = require('./../models/userModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
