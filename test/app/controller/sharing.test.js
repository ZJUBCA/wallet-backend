const {app, assert} = require('egg-mock/bootstrap');

describe('test/app/controller/sharing.test.js', () => {
  let id;
  const TEST_USER = {
    pic: 'http://www.logo.com',
    author: 'lowesyang',
    title: 'test,test',
    content: 'test,test'
  };


  beforeEach(() => {
    return app.mockCsrf()
  });

  describe('POST /sharing', () => {
    it('should POST /sharing', async () => {
      const res = await app.httpRequest()
        .post('/sharing')
        .send(TEST_USER)
        .expect(200);
      assert(res.body.code === 0);
      assert(res.body.data.post.id !== null);
      id = res.body.data.post.id;
    });
  });

  describe('GET /sharing', () => {
    it('should GET /sharing/:id', async () => {
      const res = await app.httpRequest()
        .get('/sharing/' + id)
        .expect(200);
      assert(res.body.code === 0);
      const post = res.body.data.post;
      assert(post.pic === TEST_USER.pic);
      assert(post.author === TEST_USER.author);
      assert(post.title === TEST_USER.title);
      assert(post.content === TEST_USER.title);
    });

    it('should GET /sharings', async () => {
      const res = await app.httpRequest()
        .get('/sharings?page=1&pageSize=10')
        .expect(200);
      assert(res.body.code === 0);
      const posts = res.body.data.posts;
      assert(posts.length !== 0)
    })
  });

  describe('PUT /sharing', () => {
    it('should PUT /sharing', async () => {
      const title = "i love you";
      const res = await app.httpRequest()
        .put('/sharing/' + id)
        .send({
          update: {
            title: title
          }
        })
        .expect(200);
      assert(res.body.code === 0);
      const post = res.body.data.post;
      assert(post.title === title);
    })
  });

  describe('DELETE /sharing', () => {
    it('should DELETE /sharing', async () => {
      const res = await app.httpRequest()
        .delete('/sharing/' + id)
        .expect(200);
      assert(res.body.code === 0);
    })
  })
});
