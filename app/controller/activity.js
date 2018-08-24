'use strict';

const Controller = require('egg').Controller;
const rules = require('./rules');

class ActivityController extends Controller {
  async get() {
    const {ctx, service} = this;
    ctx.validate(rules.ACTV_GET_RULES, ctx.query);

    const actv = await service.get(ctx.query.id);
    if (!actv) {
      ctx.status = 404;
    } else {
      ctx.body = {
        code: 0,
        res: {
          actv
        }
      }
    }
  }

  async fetch() {
    const {ctx, service} = this;
    ctx.validate(rules.ACTV_FETCH_RULE, ctx.query);
    const {page, pageSize} = ctx.query;

    const activities = await service.fetch(page, pageSize);
    ctx.body = {
      code: 0,
      res: {
        activities
      }
    }
  }

  async add() {
    const {ctx, service} = this;
    const body = ctx.body;
    ctx.validate(rules.ACTV_ADD_RULE, body);

    const actv = await service.add(body.icon, body.type, body.name, body.url, body.author, body.intro, body.content);
    if (!actv) {
      ctx.body = {
        code: 1
      }
    } else {
      ctx.body = {
        code: 0,
        res: {
          actv
        }
      }
    }
  }

  async update() {
    const {ctx, service} = this;
    const body = ctx.body;
    ctx.validate(rules.ACTV_UPDATE_RULE, body);

    const actv = await service.update(body.id, body.update);
    if (!actv) {
      ctx.body = {
        code: 1
      }
    } else {
      ctx.body = {
        code: 0,
        res: {
          actv
        }
      }
    }
  }

  async delete() {
    const {ctx, service} = this;
    ctx.validate(rules.ACTV_DELETE_RULE, ctx.params);

    const actv = await service.delete(ctx.params.id)
    if (!actv) {
      ctx.body = {
        code: 1
      }
    } else {
      ctx.body = {
        code: 0,
        res: {
          actv
        }
      }
    }
  }
}