'use strict';

const Controller = require('egg').Controller;
const rules = require('./rules');

class GoodsController extends Controller {
  async get() {
    const {ctx, service} = this;
    ctx.validate(rules.GOODS_GET_RULE, ctx.query);

    const item = service.goods.get(ctx.query.id);
    if (!item) {
      ctx.status = 404;
    } else {
      ctx.body = {
        code: 0,
        res: {
          item
        }
      }
    }
  }

  async fetch() {
    const {ctx, service} = this;
    ctx.validate(rules.GOODS_FETCH_RULE, ctx.query);
    const {page, pageSize} = ctx.query;

    const items = service.goods.fetch(page, pageSize);
    ctx.body = {
      code: 0,
      res: {
        items
      }
    }
  }

  async add() {
    const {ctx, service} = this;
    const body = ctx.request.body;
    ctx.validate(rules.GOODS_ADD_RULE, body);

    const item = service.goods.add(body.pic, body.name, body.provider, body.intro, body.value, body.token, body.deadline)
    if (!item) {
      ctx.body = {
        code: 1
      }
    } else {
      ctx.body = {
        code: 0,
        res: {
          item
        }
      }
    }
  }

  async update() {
    const {ctx, service} = this;
    const body = ctx.request.body;
    ctx.validate(rules.GOODS_UPDATE_RULE, body);

    const item = service.goods.update(body.id, body.update);
    if (!item) {
      ctx.body = {
        code: 1
      }
    } else {
      ctx.body = {
        code: 0,
        res: {
          item
        }
      }
    }
  }

  async delete() {
    const {ctx, service} = this;
    ctx.validate(rules.GOODS_DELETE_RULE, ctx.params);

    const item = service.goods.delete(ctx.params.id);
    if (!item) {
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