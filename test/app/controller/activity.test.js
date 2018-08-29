const {app, assert} = require('egg-mock/bootstrap');

describe('test/app/controller/activity.test.js', () => {
  let id;
  const TEST_ACTV = {
    pic: "http://www",
    title: "纳新宣讲会",
    sponsor: "zjubca",
    abstract: "纳新纳新",
    url: "http://www.www",
  };


  beforeEach(() => {
    return app.mockCsrf()
  });

  describe('POST /activity', () => {
    it('should POST /activity', async () => {
      const res = await app.httpRequest()
        .post('/activity')
        .send(TEST_ACTV)
        .expect(200);
      assert(res.body.code === 0);
      assert(res.body.data.actv.id !== null);
      id = res.body.data.actv.id;
    });
  });

  describe('GET /activity', () => {
    it('should GET /activity/:id', async () => {
      const res = await app.httpRequest()
        .get('/activity/' + id)
        .expect(200);
      assert(res.body.code === 0);
      const dapp = res.body.data.actv;
      for (let key in TEST_ACTV) {
        assert(TEST_ACTV[key] === dapp[key])
      }
    });

    it('should GET /activities', async () => {
      const res = await app.httpRequest()
        .get('/activities?page=1&pageSize=10')
        .expect(200);
      assert(res.body.code === 0);
      const actvs = res.body.data.actvs;
      assert(actvs.length !== 0)
    })
  });

  describe('PUT /activity', () => {
    it('should PUT /activity', async () => {
      const update = {
        pic: 'http://www',
        title: 'cinema',
        sponsor: 'lowesyang'

      };
      const res = await app.httpRequest()
        .put('/activity/' + id)
        .send({
          update
        })
        .expect(200);
      assert(res.body.code === 0);
      const actv = res.body.data.actv;
      for (let key in update) {
        assert(update[key] === actv[key])
      }
    })
  });

  describe('DELETE /activity', () => {
    it('should DELETE /activity', async () => {
      const res = await app.httpRequest()
        .delete('/activity/' + id)
        .expect(200);
      assert(res.body.code === 0);
    })
  })
});
