'use strict';

const Controller = require('egg').Controller;
const rules = require('./rules');
const {decodeRuleErr} = require('../utils');

class ActivityController extends Controller {
  async get() {
    const {ctx, service} = this;
    try {
      ctx.validate(rules.ACTV_GET_RULES, ctx.params);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors.field, e.errors.message))
    }

    const actv = await service.activity.get(ctx.params.id);
    if (!actv) {
      ctx.status = 404;
    } else {
      ctx.body = {
        code: 0,
        data: {
          actv
        }
      }
    }
  }

  async fetch() {
    const {ctx, service} = this;
    const [page, pageSize] = [parseInt(ctx.query.page), parseInt(ctx.query.pageSize)];

    try {
      ctx.validate(rules.ACTV_FETCH_RULE, {page, pageSize});
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors.field, e.errors.message))
    }

    const activities = await service.activity.getAll(page, pageSize);
    ctx.body = {
      code: 0,
      data: {
        activities
      }
    }
  }

  async add() {
    const {ctx, service} = this;
    const body = ctx.request.body;
    try {
      ctx.validate(rules.ACTV_ADD_RULE, body);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors.field, e.errors.message))
    }

    const actv = await service.activity.add(body.icon, body.type, body.name, body.url, body.author, body.intro, body.content);
    if (!actv) {
      throw new Error('add activity failed')
    } else {
      ctx.body = {
        code: 0,
        data: {
          actv
        }
      }
    }
  }

  async update() {
    const {ctx, service} = this;
    const body = ctx.request.body;
    try {
      ctx.validate(rules.ACTV_UPDATE_RULE, body);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors.field, e.errors.message))
    }

    const actv = await service.activity.update(body.id, body.update);
    if (!actv) {
      throw new Error('update failed')
    } else {
      ctx.body = {
        code: 0,
        data: {
          actv
        }
      }
    }
  }

  async delete() {
    const {ctx, service} = this;
    try {
      ctx.validate(rules.ACTV_DELETE_RULE, ctx.params);
    } catch (e) {
      throw new Error(decodeRuleErr(e.errors.field, e.errors.message))
    }

    const actv = await service.activity.delete(ctx.params.id);
    if (!actv) {
      throw new Error('delete failed')
    } else {
      ctx.body = {
        code: 0,
        data: {
          actv
        }
      }
    }
  }
}

module.exports = ActivityController;