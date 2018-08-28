'use strict';

const Controller = require('egg').Controller;
const rules = require('./rules');
const {decodeRuleErr} = require('../utils');

class GoodsController extends Controller {
  async get() {
    const {ctx, service} = this;
    try {
      ctx.validate(rules.GOODS_GET_RULE, ctx.query);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
    }

    const item = service.goods.get(ctx.query.id);
    if (!item) {
      ctx.status = 404;
    } else {
      ctx.body = {
        code: 0,
        data: {
          item
        }
      }
    }
  }

  async fetch() {
    const {ctx, service} = this;
    const [page, pageSize] = [parseInt(ctx.query.page), parseInt(ctx.query.pageSize)];

    try {
      ctx.validate(rules.GOODS_FETCH_RULE, {page, pageSize});
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
    }

    const items = service.goods.getAll(page, pageSize);
    ctx.body = {
      code: 0,
      data: {
        items
      }
    }
  }

  async add() {
    const {ctx, service} = this;
    const body = ctx.request.body;
    try {
      ctx.validate(rules.GOODS_ADD_RULE, body);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
    }

    const item = service.goods.add(body.pic, body.name, body.provider, body.intro, body.value, body.token, body.deadline)
    if (!item) {
      throw new Error('add item failed')
    } else {
      ctx.body = {
        code: 0,
        data: {
          item
        }
      }
    }
  }

  async update() {
    const {ctx, service} = this;
    const body = ctx.request.body;
    try {
      ctx.validate(rules.GOODS_UPDATE_RULE, body);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
    }

    const item = service.goods.update(body.id, body.update);
    if (!item) {
      throw new Error('update failed')
    } else {
      ctx.body = {
        code: 0,
        data: {
          item
        }
      }
    }
  }

  async delete() {
    const {ctx, service} = this;
    try {
      ctx.validate(rules.GOODS_DELETE_RULE, ctx.params);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
    }
    const item = service.goods.delete(ctx.params.id);
    if (!item) {
      throw new Error('delete failed')
    } else {
      ctx.body = {
        code: 0
      }
    }
  }
}

module.exports = GoodsController