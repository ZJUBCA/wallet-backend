const {app, assert} = require('egg-mock/bootstrap');
const moment = require('moment');

describe('test/app/controller/goods.test.js', () => {
  let id;
  const TEST_ITEM = {
    pic: "http://www.com",
    name: "洗发水",
    provider: "zjubca",
    intro: "zjubcazjubca",
    value: 1000,
    token: "EOS",
    deadline: moment().format('YYYY-MM-DD HH:mm:ss'),
  };


  beforeEach(() => {
    return app.mockCsrf()
  });

  describe('POST /item', () => {
    it('should POST /item', async () => {
      const res = await app.httpRequest()
        .post('/item')
        .send(TEST_ITEM)
        .expect(200);
      assert(res.body.code === 0);
      assert(res.body.data.item.id !== null);
      id = res.body.data.item.id;
    });
  });

  describe('GET /item', () => {
    it('should GET /item/:id', async () => {
      const res = await app.httpRequest()
        .get('/item/' + id)
        .expect(200);
      assert(res.body.code === 0);
      const item = res.body.data.item;
      for (let key in TEST_ITEM) {
        TEST_ITEM[key] = item[key]
      }
    });

    it('should GET /goods', async () => {
      const res = await app.httpRequest()
        .get('/goods?page=1&pageSize=10')
        .expect(200);
      assert(res.body.code === 0);
      const items = res.body.data.items;
      assert(items.length !== 0)
    })
  });

  describe('PUT /item', () => {
    it('should PUT /item', async () => {
      const update = {
        pic: 'http://www',
        name: 'cinema',
        provider: 'lowesyang',
        value: 300
      };
      const res = await app.httpRequest()
        .put('/item/' + id)
        .send({
          update
        })
        .expect(200);
      assert(res.body.code === 0);
      const item = res.body.data.item;
      for (let key in update) {
        assert(update[key] === item[key])
      }
    })
  });

  describe('DELETE /item', () => {
    it('should DELETE /item', async () => {
      const res = await app.httpRequest()
        .delete('/item/' + id)
        .expect(200);
      assert(res.body.code === 0);
    })
  })
});
