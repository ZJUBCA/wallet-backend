'use strict';

const Controller = require('egg').Controller;
const rules = require('./rules');
const { decodeRuleErr } = require('../utils');

class GoodsController extends Controller {
  async get() {
    const { ctx, service } = this;
    try {
      ctx.validate(rules.GOODS_GET_RULE, ctx.params);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
    }

    const item = await service.goods.get(ctx.params.id);
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
    const { ctx, service } = this;
    const [page, pageSize] = [parseInt(ctx.query.page), parseInt(ctx.query.pageSize)];

    try {
      ctx.validate(rules.GOODS_FETCH_RULE, { page, pageSize });
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
    }

    const items = await service.goods.getAll(page, pageSize);
    ctx.body = {
      code: 0,
      data: {
        items
      }
    }
  }

  async add() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    const token = this.ctx.request.header['authorization'];
    if (await this.service.user.isAdmin(token)) {
      try {
        ctx.validate(rules.GOODS_ADD_RULE, body);
      } catch (e) {
        throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
      }

      const item = await service.goods.add(body.pic, body.name, body.provider, body.intro, body.value, body.token, body.deadline);
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
    } else {
      this.ctx.body = {
        code: 1,
        data: {
          message: "unauthorized"
        }
      }
    }
  }

  async update() {
    const { ctx, service } = this;
    const token = this.ctx.request.header['authorization'];
    if (await this.service.user.isAdmin(token)) {
      const body = ctx.request.body;
      try {
        ctx.validate(rules.GOODS_UPDATE_RULE, body);
      } catch (e) {
        throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
      }
      const id = parseInt(ctx.params.id);
      if (isNaN(id)) {
        throw new Error('id should be integer');
      }

      const item = await service.goods.update(id, body.update);
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
    } else {
      this.ctx.body = {
        code: 1,
        data: {
          message: "unauthorized"
        }
      }
    }
  }

  async delete() {
    const { ctx, service } = this;
    const token = this.ctx.request.header['authorization'];
    if (await this.service.user.isAdmin(token)) {
      try {
        ctx.validate(rules.GOODS_DELETE_RULE, ctx.params);
      } catch (e) {
        throw new Error(decodeRuleErr(e.errors[0].field, e.errors[0].message));
      }
      const item = await service.goods.delete(ctx.params.id);
      if (!item) {
        throw new Error('delete failed')
      } else {
        ctx.body = {
          code: 0
        }
      }
    } else {
      this.ctx.body = {
        code: 1,
        data: {
          message: "unauthorized"
        }
      }
    }
  }
}

module.exports = GoodsController