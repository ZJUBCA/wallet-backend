'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const LRU = require('lru-cache');
const CACHE_MAX_AGE = 24 * 60 * 60;

module.exports = app => {
  // app.validator.addRule('json', (rule, value) => {
  //   try {
  //     JSON.parse(value)
  //   } catch (err) {
  //     return 'must be json string'
  //   }
  // });

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

  const {router, controller} = app;

  // Sharing route
  router.get('/sharing/:id', controller.sharing.get);
  router.get('/sharings', controller.sharing.fetch);
  router.post('/sharing', controller.sharing.add);
  router.put('/sharing/:id', controller.sharing.update);
  router.delete('/sharing/:id', controller.sharing.delete);

  // Activity route
  router.get('/activity/:id', controller.activity.get);
  router.get('/activities', controller.activity.fetch);
  router.post('/activity', controller.activity.add);
  router.put('/activity/:id', controller.activity.update);
  router.delete('/activity/:id', controller.activity.delete);
  router.get('/recom', controller.activity.getRecoms);
  router.post('/recom', controller.activity.addRecom);
  router.put('/recom/:id', controller.activity.updateRecom);
  router.delete('/recom/:id', controller.activity.deleteRecom);

  // DappStore route
  router.get('/dapp/:id', controller.dappStore.get);
  router.get('/dapps', controller.dappStore.fetch);
  router.post('/dapp', controller.dappStore.add);
  router.put('/dapp/:id', controller.dappStore.update);
  router.delete('/dapp/:id', controller.dappStore.delete);

  // Goods route
  router.get('/item/:id', controller.goods.get);
  router.get('/goods', controller.goods.fetch);
  router.post('/item', controller.goods.add);
  router.put('/item/:id', controller.goods.update);
  router.delete('/item/:id', controller.goods.delete);
};
