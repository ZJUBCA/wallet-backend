'use strict';

const Controller = require('egg').Controller;
const rules = require('./rules');

class DappController extends Controller {
  async get() {
    const {ctx, service} = this;
    ctx.validate(rules.DAPP_GET_RULES, ctx.query);

    const dapp = await service.get(ctx.query.id);
    if (!dapp) {
      ctx.status = 404;
    } else {
      ctx.body = {
        code: 0,
        res: {
          dapp
        }
      }
    }
  }

  async fetch() {
    const {ctx, service} = this;
    ctx.validate(rules.DAPP_FETCH_RULE, ctx.query);
    const {page, pageSize} = ctx.query;

    const dapps = await service.fetch(page, pageSize);
    ctx.body = {
      code: 0,
      res: {
        dapps
      }
    }
  }

  async add() {
    const {ctx, service} = this;
    const body = ctx.body;
    ctx.validate(rules.DAPP_ADD_RULE, body);

    const dapp = await service.add(body.icon, body.type, body.name, body.url, body.author, body.intro, body.content);
    if (!dapp) {
      ctx.body = {
        code: 1
      }
    } else {
      ctx.body = {
        code: 0,
        res: {
          dapp
        }
      }
    }
  }

  async update() {
    const {ctx, service} = this;
    const body = ctx.body;
    ctx.validate(rules.DAPP_UPDATE_RULE, body);

    const dapp = await service.update(body.id, body.update);
    if (!dapp) {
      ctx.body = {
        code: 1
      }
    } else {
      ctx.body = {
        code: 0,
        res: {
          dapp
        }
      }
    }
  }

  async delete() {
    const {ctx, service} = this;
    ctx.validate(rules.DAPP_DELETE_RULE, ctx.params);

    const dapp = await service.delete(ctx.params.id)
    if (!dapp) {
      ctx.body = {
        code: 1
      }
    } else {
      ctx.body = {
        code: 0,
        res: {
          dapp
        }
      }
    }
  }
}