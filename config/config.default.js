'use strict';

const {key} = require('./secure')

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + `_${key}`;

  // add your config here
  config.middleware = [];

  // error handler
  config.onerror = {
    json(err, ctx) {
      ctx.status = 200;
      
      ctx.logger.error(err.errors);
      // json handler
      ctx.body = {
        code: 1,
        msg: err.message
      };
    }
  };
  config.security= {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  }

  return config;
};

exports.jwt = {
  secret: "123456"
};
