const {app, assert} = require('egg-mock/bootstrap');

describe('test/app/controller/dappStore.test.js', () => {
  let id;
  const TEST_DAPP = {
    icon: 'http://www.www',
    type: 'game',
    name: 'fomo3d',
    url: 'http://www.www.www.com',
    author: 'lowesyang',
    intro: 'lalalalla',
    content: 'msmkdfkmsdl'
  };


  beforeEach(() => {
    return app.mockCsrf()
  });

  describe('POST /dapp', () => {
    it('should POST /dapp', async () => {
      const res = await app.httpRequest()
        .post('/dapp')
        .send(TEST_DAPP)
        .expect(200);
      assert(res.body.code === 0);
      assert(res.body.data.dapp.id !== null);
      id = res.body.data.dapp.id;
    });
  });

  describe('GET /dapp', () => {
    it('should GET /dapp/:id', async () => {
      const res = await app.httpRequest()
        .get('/dapp/' + id)
        .expect(200);
      assert(res.body.code === 0);
      const dapp = res.body.data.dapp;
      for (let key in TEST_DAPP) {
        TEST_DAPP[key] = dapp[key]
      }
    });

    it('should GET /dapps', async () => {
      const res = await app.httpRequest()
        .get('/dapps?page=1&pageSize=10')
        .expect(200);
      assert(res.body.code === 0);
      const dapps = res.body.data.dapps;
      assert(dapps.length !== 0)
    })
  });

  describe('PUT /dapp', () => {
    it('should PUT /dapp', async () => {
      const update = {
        author: 'boy',
        type: 'cinema',
        intro: '666'

      };
      const res = await app.httpRequest()
        .put('/dapp/' + id)
        .send({
          update
        })
        .expect(200);
      assert(res.body.code === 0);
      const dapp = res.body.data.dapp;
      for (let key in update) {
        assert(update[key] === dapp[key])
      }
    })
  });

  describe('DELETE /dapp', () => {
    it('should DELETE /dapp', async () => {
      const res = await app.httpRequest()
        .delete('/dapp/' + id)
        .expect(200);
      assert(res.body.code === 0);
    })
  })
});
