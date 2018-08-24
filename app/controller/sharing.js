'use strict';

const Controller = require('egg').Controller;
const rules = require('./rules');

class SharingController extends Controller {
  async get() {
    const {ctx, service} = this;
    ctx.validate(rules.SHARING_GET_RULE, ctx.query);

    const post = await service.sharing.get(ctx.query.id);
    if (!post) {
      ctx.status = 404
    } else {
      ctx.body = {
        code: 0,
        res: {
          post
        }
      }
    }
  }

  async fetch() {
    const {ctx, service} = this;
    ctx.validate(rules.SHARING_FETCH_RULE, ctx.query);
    const {page, pageSize} = ctx.query;

    const posts = await service.sharing.fetch(page, pageSize);
    ctx.body = {
      code: 0,
      res: {
        posts
      }
    }
  }

  async add() {
    const {ctx, service} = this;
    const body = ctx.request.body
    ctx.validate(rules.SHARING_ADD_RULE, body);

    const post = await service.sharing.add(body.pic, body.author, body.title, body.content)
    if (!post) {
      ctx.body = {
        code: 1
      }
    } else {
      ctx.body = {
        code: 0,
        res: {
          post
        }
      }
    }
  }

  async update() {
    const {ctx, service} = this;
    const body = ctx.request.body
    ctx.validate(rules.SHARING_UPDATE_RULE, body);

    const post = await service.sharing.update(body.id, body.update);
    if (!post) {
      ctx.body = {
        code: 1
      }
    } else {
      ctx.body = {
        code: 0,
        res: {
          post
        }
      }
    }
  }

  async delete() {
    const {ctx, service} = this;
    const body = ctx.request.body
    ctx.validate(rules.SHARING_DELETE_RULE, body)

    const post = await service.sharing.delete(body.id)
    if (!post) {
      ctx.body = {
        code: 1
      }
    } else {
      ctx.body = {
        code: 0
      }
    }
  }
}

module.exports = SharingController;
