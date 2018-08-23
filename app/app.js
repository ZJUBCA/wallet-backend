const LRU = require('lru-cache');
const CACHE_MAX_AGE = 24 * 60 * 60;

module.exports = app => {
  app.validator.addRule('json', (rule, value) => {
    try {
      JSON.parse(value)
    } catch (err) {
      return 'must be json string'
    }
  });

  // LRU cache initialize
  app.sharingCache = LRU({
    max: 1000,
    maxAge: CACHE_MAX_AGE
  });

  app.dappCache = LRU({
    max: 2048,
    maxAge: CACHE_MAX_AGE
  });

  app.actvCache = LRU({
    max: 1000,
    maxAge: CACHE_MAX_AGE
  });
};