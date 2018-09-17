'use strict';

const {key} = require('./secure')

module.exports = appInfo => {
  const config = exports = {};

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'wallet-dev',
  };

  return config;
};
