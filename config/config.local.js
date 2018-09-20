'use strict';

const { key } = require('./secure')

module.exports = appInfo => {
  const config = exports = {};

  config.sequelize = {
    dialect: 'mysql',
    host: '111.231.75.113',
    port: 3306,
    database: 'wallet-dev',
    username: 'zju',
    password: '123456',
  };

  return config;
};
