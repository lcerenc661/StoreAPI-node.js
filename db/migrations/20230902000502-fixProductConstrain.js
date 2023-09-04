'use strict';

const { PRODUCT_TABLE } = require('../models/productModel');

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(PRODUCT_TABLE, 'category_id', {
      field: 'category_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface) {
    await queryInterface.changeColumn(PRODUCT_TABLE, 'category_id', {
      field: 'category_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    });
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
