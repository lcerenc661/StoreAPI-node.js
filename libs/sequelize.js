const { Sequelize } = require('sequelize')

const { config } = require('../config/config');
const setupModels = require('../db/models/index')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`; // Correct the template string

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});  //This instance works with a pool connection to our database.

setupModels(sequelize);

// sequelize.sync(); //Sequelize reads the models and synchronices with the tables

module.exports = sequelize;
