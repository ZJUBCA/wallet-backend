const SHARING_RULE = require('./sharing');
const DAPP_RULE = require('./dapp');
const GOODS_RULE = require("./goods");
const ACTV_RULE = require('./activity');

module.exports = {
  ...SHARING_RULE,
  ...DAPP_RULE,
  ...GOODS_RULE,
  ...ACTV_RULE
};