'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1534654846831_1822';

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect:'sqlite',
    storage:'../database/wallet.sqlite',
  }

  return config;
};
