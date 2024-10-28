// Load environment variables from .env file
require('dotenv').config();

const { Sequelize } = require('sequelize');
const config = require('./config/config.json');

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

// Replace password with environment variable
dbConfig.password = process.env[`DB_PASSWORD_${environment.toUpperCase()}`];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;